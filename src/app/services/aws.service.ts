import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
	s3;
  constructor() {
    this.s3 = new AWS.S3({apiVersion: '2006-03-01'});
    AWS.config.accessKeyId = environment.aws_access;
    AWS.config.secretAccessKey = environment.aws_secret;
  }

  uploadToAWS(file,fileName?){
    var key = fileName ? fileName : file.name;
    var bucket = new AWS.S3({params: {Bucket: 'lazsoc-images'}});
    var params = {Bucket: 'lazsoc-images', Key: key, Body: file};
    bucket.upload(params, function (err, data) {
      console.log(err, data);
    });   
  }

  getFromAWS(imgKey){
    var bucket = new AWS.S3({params: {Bucket: 'lazsoc-images'}});
  	var params = {
		  Bucket: "lazsoc-images", 
		  Key: "headshot_2.jpg"
		};
    bucket.getObject(params,function(err,data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
    // return new Promise(function(resolve,reject) {
    //   this.s3.getObject(params);
    // })
  }

  getSignatureKey(Crypto, key, dateStamp, regionName, serviceName) {
    var kDate = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
    var kRegion = Crypto.HmacSHA256(regionName, kDate);
    var kService = Crypto.HmacSHA256(serviceName, kRegion);
    var kSigning = Crypto.HmacSHA256("aws4_request", kService);
    console.log(kSigning);
    return kSigning;
  }
}