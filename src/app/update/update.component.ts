import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AwsService } from '../services/aws.service';
import * as AWS from 'aws-sdk';

const URL = 'http://localhost:3000/api/upload_avatar';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateObj = {
    first_name:"",
    last_name:"",
    program:"",
    image:"",
    summary:"",
    is_bean:"",
    profile_header:"",
    school_year:"",
  };

  work_experiences_attributes = [{
    title:"",
    summary:"",
    started_date:"",
    end_date:"",
    is_current:false,
    company:""
  }];
  // @ViewChild('fileInput') fileInput;
  imageUploaded = false;
  newAvatar:any;
  public currentUser;
  profileImg = "assets/img/Upload.png";

  constructor(public authService:AuthService, public awsService:AwsService) {
    this.currentUser = authService.currentUser();
    // console.log(this.currentUser);
    this.initUpdateObj();
  }

  ngOnInit() {
  }

  // fileChangeEvents(fileInput: any) {
  //     this.updateObj.avatar_file = fileInput.target.files;
  //   }
  
  fileEvent(event: any){
    this.newAvatar = event.target.files[0];
    this.imageUploaded = true;
    var reader = new FileReader();
      reader.onload = (event:any) => {
        $('#avatar').attr('src', event.target.result);
        // this.doCropper(cover);
      }
      reader.readAsDataURL(event.target.files[0]);
    // this.awsService.uploadToAWS(file);
  }

  getPic(){
    this.awsService.getFromAWS("");
  }

  addWorkExp(){
    this.work_experiences_attributes.push({
      title:"",
      summary:"",
      started_date:"",
      end_date:"",
      is_current:false,
      company:""
    })
  }
  removeWorkExp(index){
    this.work_experiences_attributes.splice(index,1);
    // console.log(this.work_experiences_attributes);
  }

  postUpdates(){
    if (this.imageUploaded) {
      let avatarUrl = `user-${this.awsService.randomString(10)}`;
      this.updateObj.image = `https://s3.us-east-2.amazonaws.com/lazsoc-images/${avatarUrl}`;
      this.awsService.uploadToAWS(this.newAvatar,avatarUrl);
    }
    this.authService.updateUser(this.updateObj).then(res => {
      // console.log(res);
    })
  }

  initUpdateObj(){
    if (this.currentUser){
      this.updateObj = {
        first_name:this.currentUser.first_name,
        last_name:this.currentUser.last_name,
        program:this.currentUser.program,
        image:this.currentUser.image,
        summary:this.currentUser.summary,
        is_bean:this.currentUser.isBean,
        profile_header:this.currentUser.profile_header,
        school_year:this.currentUser.school_year,
      };
    }
  }

}
