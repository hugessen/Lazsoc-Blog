import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AwsService } from '../services/aws.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as Crypto from 'crypto-js';
import * as Cropper from 'cropperjs';
import * as $ from 'jquery';
// import * as froalaS3 from 'wysiwyg-editor-node-sdk/lib/s3.js';

@Component({
  selector: 'app-article-composer',
  templateUrl: './article-composer.component.html',
  styleUrls: ['./article-composer.component.css']
})
export class ArticleComposerComponent implements OnInit {

  cover_photo:any;
  submissionError = false;

  editorContent = "";
  editorView = true;
  article:{};
  articles = [];
  title:string = "";
  hasCover = false;
  cropper:any;
  url:any;
  froalaConfigs;
  constructor(public authService: AuthService, private router: Router, public awsService:AwsService) {
    var configs = {
      bucket: 'lazsoc-images',
      region: 'us-east-2',
      keyStart: 'article_images',
      acl: 'public-read',
      accessKey: environment.aws_access,
      secretKey: environment.aws_secret
    }
     
    let s3Hash = this.awsService.getHash(configs);

    this.froalaConfigs = {
      placeholder: "Edit Me",
      toolbarButtons:['bold', 'italic', 'underline', 'fontSize', '|', 'formatOL', 'formatUL', 'quote', 'insertLink', 'insertImage'],
      fontSize: ['2.5','8', '10', '12', '14', '18', '30', '60', '96'],
      height: 500,
      imageOutputSize: true,
      imageDefaultWidth: 700,
      // imageUploadToS3: s3Hash,
      key: 'rgmwA-21d1sD1qr=='
    }
    var changes = false;  
    // Enable navigation prompt
    window.onbeforeunload = function() {
        return true;
    };
    // Remove navigation prompt
    window.onbeforeunload = null;
  }

  ngOnInit() {
  }

  submit(){
    let cover_url = null
    if (this.hasCover) {
      cover_url = `article-${this.awsService.randomString(10)}`; 
      this.awsService.uploadToAWS(this.cover_photo, cover_url);
    }
    this.article = {
      cover_url: cover_url ? `https://s3.us-east-2.amazonaws.com/lazsoc-images/${cover_url}` : null,
      title: this.title,
      body: this.editorContent
    }
    this.authService.apiPost('post_article', this.article).then(res => {
      console.log(res)
      this.router.navigate(['./newsfeed']);
    }).catch(err => this.submissionError = true);
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      this.hasCover = true;
      this.cover_photo = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event:any) => {
        $('#cover').attr('src', event.target.result);
        var cover = document.querySelector('#cover');
        // this.doCropper(cover);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  doCropper(image){
    this.cropper = new Cropper(image, {
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
    var date = new Date(); //Using this we can convert any date format to JS Date
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
  }

  uploadCoverToS3() {
    // let data = this.cropper.getCroppedCanvas().toBlob(function(blob) {

    // });
    // this.awsService.uploadToAWS(data,"Cover.jpg");
  }

  removeCover() {
    this.cover_photo = null;
    this.hasCover = false;
    $('#cover').attr('src', "");
  }
}
