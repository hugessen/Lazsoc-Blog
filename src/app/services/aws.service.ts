import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Crypto from 'crypto-js';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
	s3;
  constructor() {
    this.s3 = new AWS.S3({apiVersion: '2006-03-01'});
    AWS.config.accessKeyId = environment.aws_access;
    AWS.config.secretAccessKey = environment.aws_secret;
  }

  uploadToAWS(file, fileName?) {
    const key = fileName ? fileName : file.name;
    const bucket = new AWS.S3({params: {Bucket: 'lazsoc-images'}});
    const params = {Bucket: 'lazsoc-images', Key: key, Body: file};
    bucket.upload(params, function (err, data) {
      console.log(err, data);
    });
  }

  getFromAWS(imgKey) {
    const bucket = new AWS.S3({params: {Bucket: 'lazsoc-images'}});
  	const params = {
		  Bucket: 'lazsoc-images',
		  Key: imgKey
		};
    bucket.getObject(params, function(err, data) {
      if (err) { console.log(err, err.stack); } else {     console.log(data); }           // successful response
    });
    // return new Promise(function(resolve,reject) {
    //   this.s3.getObject(params);
    // })
  }

  getHash(cfg) {
    cfg.region = cfg.region || 'us-east-1';
    cfg.region = cfg.region === 's3' ? 'us-east-1' : cfg.region;

    const bucket = cfg.bucket;
    const region = cfg.region;
    const keyStart = cfg.keyStart;
    const acl = cfg.acl;

    const accessKeyId = cfg.accessKey;
    const secret = cfg.secretKey;

    const date = new Date().toISOString();
    const dateString = date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2); // Ymd format.

    const credential = [accessKeyId, dateString, region, 's3/aws4_request'].join('/');
    const xAmzDate = dateString + 'T000000Z';

    const policy = {
        expiration: new Date((new Date).getTime() + (30 * 60 * 1000)).toISOString(),
        conditions: [
            {bucket: bucket},
            {acl: acl},
            {'success_action_status': '201'},
            {'x-requested-with': 'xhr'},
            {'x-amz-algorithm': 'AWS4-HMAC-SHA256'},
            {'x-amz-credential': credential},
            {'x-amz-date': xAmzDate},
            ['starts-with', '$key', keyStart],
            ['starts-with', '$Content-Type', 'image/']
        ],
    };
    const policyBase64 = new Buffer(JSON.stringify(policy)).toString('base64');

    const dateKey = Crypto.HmacSHA256(dateString, 'AWS4' + secret);
    const dateRegionKey = Crypto.HmacSHA256(region, dateKey);
    const dateRegionServiceKey = Crypto.HmacSHA256('s3', dateRegionKey);
    const signingKey = Crypto.HmacSHA256('aws4_request', dateRegionServiceKey);
    const signature = Crypto.HmacSHA256(policyBase64, signingKey).toString(Crypto.enc.Hex);

    return {
      bucket: bucket,
      region: region !== 'us-east-1' ? 's3-' + region : 's3',
      keyStart: keyStart,
      params: {
          acl: acl,
          policy: policyBase64,
          'x-amz-algorithm': 'AWS4-HMAC-SHA256',
          'x-amz-credential': credential,
          'x-amz-date': xAmzDate,
          'x-amz-signature': signature
      }
    };
  }

  randomString(len) {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randStr = '';
    for (let i = 0; i < len; i++) {
        randStr += charSet[Math.floor(Math.random() * charSet.length)];
    }
    return randStr;
  }
}
