import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AwsService } from '../services/aws.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as Crypto from 'crypto-js';
import * as Cropper from 'cropperjs';

@Component({
  selector: 'app-article-composer',
  templateUrl: './article-composer.component.html',
  styleUrls: ['./article-composer.component.css']
})
export class ArticleComposerComponent implements OnInit {

  public options: Object = {
    placeholder: "Edit Me",
    toolbarButtons:['bold', 'italic', 'underline', 'fontFamily', 'fontSize', '|', 'formatOL', 'formatUL', 'quote', 'insertLink', 'insertImage'],
    fontSize: ['2.5','8', '10', '12', '14', '18', '30', '60', '96'],
    height: 500
  //   imageUploadToS3: {
  //     bucket: 'lazsoc-images',
  //     // Your bucket region.
  //     region: 'us-east-1',
  //     keyStart: 'article_images/',
  //     params: {
  //       acl: 'public-read', // ACL according to Amazon Documentation.
  //       AWSAccessKeyId: environment.aws_access, // Access Key from Amazon.
  //       policy: `{ 
  //         "Id": "Policy1514599679096",
  //         "Version": "2012-10-17",
  //         "Statement": [
  //           {
  //             "Sid": "Stmt1514599674967",
  //             "Action": "s3:*",
  //             "Effect": "Allow",
  //             "Resource": "arn:aws:s3:::lazsoc-images/AKIAIGEQRRLJR7KOXTAA",
  //             "Principal": {
  //               "AWS": [
  //                 "arn:aws:iam:: 257311162376:root"
  //               ]
  //             }
  //           }
  //         ]
  //       }`, // Policy string computed in the backend.
  //       signature: this.awsService.getSignatureKey(Crypto,environment.aws_access,this.getDatestamp(),'us-east-1','s3'), // Signature computed in the backend.
  //   }
  // }
  }

  editorContent = "";
  editorView = true;
  article:{};
  articles = [];
  title:string = "";
  coverURL = "assets/img/Image Upload.png";
  constructor(public authService: AuthService, private router: Router, public awsService:AwsService) { 
  }

  ngOnInit() {
  }

  submit(){
    console.log(this.editorContent);
    this.article = {
      title: this.title,
      body: this.editorContent
    }
    this.authService.apiPost('post_article', this.article).then(res => {
      console.log(res)
      this.router.navigate(['./newsfeed']);
    });
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.coverURL = event.target.result;
        this.doCropper(event.target);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  doCropper(image){
    var cropper = new Cropper(image, {
        viewMode: 3,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        modal: false,
        guides: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
      });
  }

  getDatestamp(){
    let date = new Date();
    return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
  }
}
