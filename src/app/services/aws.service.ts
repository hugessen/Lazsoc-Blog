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
		  Key: 'headshot_2.jpg'
		};
    bucket.getObject(params, function(err, data) {
      if (err) { console.log(err, err.stack); } else {     console.log(data); }           // successful response
    });
    // return new Promise(function(resolve,reject) {
    //   this.s3.getObject(params);
    // })
  }

  getSignatureKey(key, dateStamp, regionName, serviceName) {
    // console.log("get signature key", key, dateStamp, regionName, serviceName);
    const kDate = Crypto.HmacSHA256(dateStamp, 'AWS4' + key);
    const kRegion = Crypto.HmacSHA256(regionName, kDate);
    const kService = Crypto.HmacSHA256(serviceName, kRegion);
    const kSigning = Crypto.HmacSHA256('aws4_request', kService);
    return kSigning.toString(Crypto.enc.Hex);
  }

  getHash(config) {
    // Check default region.
    config.region = config.region || 'us-east-1';
    config.region = config.region === 's3' ? 'us-east-1' : config.region;

    const bucket = config.bucket;
    const region = config.region;
    const keyStart = config.keyStart;
    const acl = config.acl;

    // These can be found on your Account page, under Security Credentials > Access Keys.
    const accessKeyId = config.accessKey;
    const secret = config.secretKey;

    const date = new Date().toISOString();
    const dateString = date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2); // Ymd format.

    const credential = [accessKeyId, dateString, region, 's3/aws4_request'].join('/');
    const xAmzDate = dateString + 'T000000Z';

    const policy = {
      // 5 minutes into the future
      expiration: new Date((new Date).getTime() + (5 * 60 * 1000)).toISOString(),
      conditions: [
        {bucket: bucket},
        {acl: acl },
        {'success_action_status': '201'},
        {'x-requested-with': 'xhr'},
        {'x-amz-algorithm': 'AWS4-HMAC-SHA256'},
        {'x-amz-credential': credential},
        {'x-amz-date': xAmzDate},
        ['starts-with', '$key', keyStart],
        ['starts-with', '$Content-Type', ''] // accept all files
      ],
    }
    const policyBase64 = new Buffer(JSON.stringify(policy)).toString('base64');

    const signature = this.getSignatureKey(secret, dateString, region, 's3');
    console.log(signature);

    // var dateKey = this.hmac('AWS4' + secret, dateString);
    // var dateRegionKey = this.hmac(dateKey, region);
    // var dateRegionServiceKey = this.hmac(dateRegionKey, 's3');
    // var signingKey = this.hmac(dateRegionServiceKey, 'aws4_request');
    // var signature = this.hmac(signingKey, policyBase64).toString('hex');

    const returnVal = {
      bucket: bucket,
      region: region != 'us-east-1' ? 's3-' + region : 's3',
      keyStart: keyStart,
      params: {
        acl: acl,
        policy: policyBase64,
        'x-amz-algorithm': 'AWS4-HMAC-SHA256',
        'x-amz-credential': credential,
        'x-amz-date': xAmzDate,
        'x-amz-signature': signature
      }
    }
    console.log(returnVal);
    return returnVal;
  }

  hmac(key, string) {
    const hmac = Crypto.createHmac('sha256', key);
    hmac.end(string);
    return hmac.read();
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
