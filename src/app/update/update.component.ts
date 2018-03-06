import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AwsService } from '../services/aws.service';
import { Router } from '@angular/router';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateObj;

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
  isFirstUpdate = false;
  newAvatar:any;
  isSubmitting = false;
  profileImg = "assets/img/Upload.png";
  currentUser:any;

  submissionErrors = {firstName: false, lastName: false};
  hasErrors = false;

  constructor(public authService:AuthService, public awsService:AwsService, public router:Router) {
    this.authService.getUserAsync().then(res => {
      this.currentUser = res;
      this.initUpdateObj(res);
    });

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

  canDeactivate() {
    if (!this.currentUser.has_updated){
      if (this.isSubmitting)
        return true;
      if (window.confirm("Are you sure you want to leave? You will be logged out until you return to create a profile here.")){
        this.authService.logOutUser();
        location.reload();
        return true;
      } 
      else return false;
    }
    else return true;
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
    if (this.hasSubmissionErrors()){
      console.log("Here be dragons");
      this.hasErrors = true;
      return;
    }
    console.log("We good!");

    if (this.imageUploaded) {
      console.log("Attempting to upload");
      let avatarUrl = `profile_avatars/user-${this.awsService.randomString(10)}`;
      this.updateObj.image = `https://s3.us-east-2.amazonaws.com/lazsoc-images/user-avatars/${avatarUrl}`;
      this.awsService.uploadToAWS(this.newAvatar,avatarUrl);
    }
    this.authService.updateUser(this.updateObj).then(res => {
      this.isSubmitting = true;
      this.router.navigateByUrl("/newsfeed");
    })
  }

  hasSubmissionErrors() {
    let hasErrors = false;
    console.log(this.updateObj);
    if (this.updateObj.first_name == null || this.updateObj.first_name == ""){
      document.getElementById("firstname").classList.add("danger");
      hasErrors = true;
    }
    if (this.updateObj.last_name === null || this.updateObj.last_name == ""){
      document.getElementById("lastname").classList.add("danger");
      hasErrors = true;
    }
    return hasErrors;
  }

  initUpdateObj(user){
    this.updateObj = {
      first_name:user.first_name,
      last_name:user.last_name,
      program:user.program,
      image:user.image,
      summary:user.summary,
      is_bean:user.isBean,
      profile_header:user.profile_header,
      school_year:user.school_year,
    };
  }

}
