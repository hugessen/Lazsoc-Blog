import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AwsService } from '../services/aws.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateObject, WorkExperience } from '../models/update_object';
import * as AWS from 'aws-sdk';
import * as $ from 'jquery';
window['$'] = $;
window['jQuery'] = $;

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateObj:UpdateObject = new UpdateObject();

  // @ViewChild('fileInput') fileInput;
  imageUploaded = false;
  isFirstUpdate = false;
  newAvatar: any;
  isSubmitting = false;
  profileImg = 'assets/img/Upload.png';
  currentUser: any;

  submissionErrors = {firstName: false, lastName: false};
  hasErrors = false;

  constructor(public authService: AuthService, public awsService: AwsService, public router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => { 
      this.currentUser = data.user;
      this.initUpdateObj(data.user);
     });
  }

  fileEvent(event: any) {
    this.newAvatar = event.target.files[0];
    this.imageUploaded = true;
    const reader = new FileReader();
      reader.onload = (event: any) => {
        $('#avatar').attr('src', event.target.result);
        // this.doCropper(cover);
      }
      reader.readAsDataURL(event.target.files[0]);
    // this.awsService.uploadToAWS(file);
  }

  getPic() {
    this.awsService.getFromAWS('');
  }

  canDeactivate() {
    if (!this.currentUser.has_updated) {
      if (this.isSubmitting) {
        return true;
      }
      if (window.confirm('Are you sure you want to leave? You will be logged out until you return to create a profile here.')) {
        this.authService.logOutUser();
        location.reload();
        return true;
      } else { return false; }
    } else { return true; }
  }

  addWorkExp() {
    this.updateObj.work_experiences_attributes.push(new WorkExperience())
  }

  removeWorkExp(index) {
    this.updateObj.work_experiences_attributes.splice(index, 1);
    // console.log(this.work_experiences_attributes);
  }

  postUpdates() {
    if (this.hasSubmissionErrors()) {
      this.hasErrors = true;
      return;
    }

    if (this.imageUploaded) {
      console.log('Attempting to upload');
      const avatarUrl = `profile_avatars/user-${this.awsService.randomString(10)}`;
      this.updateObj.image = `https://s3.us-east-2.amazonaws.com/lazsoc-images/${avatarUrl}`;
      this.awsService.uploadToAWS(this.newAvatar, avatarUrl);
    }
    console.log(this.updateObj);
    this.authService.updateUser(this.updateObj).then(res => {
      this.isSubmitting = true;
      this.router.navigateByUrl('/newsfeed');
    })
  }

  hasSubmissionErrors() {
    let hasErrors = false;
    if (this.updateObj.first_name == null || this.updateObj.first_name == '') {
      document.getElementById('firstname').classList.add('danger');
      hasErrors = true;
    }
    if (this.updateObj.last_name === null || this.updateObj.last_name == '') {
      document.getElementById('lastname').classList.add('danger');
      hasErrors = true;
    }
    return hasErrors;
  }

  initUpdateObj(user) {
    this.updateObj = {
      first_name: user.first_name,
      last_name: user.last_name,
      program: user.program,
      student_id: user.student_id,
      image: user.image,
      summary: user.summary,
      is_bean: user.isBean,
      profile_header: user.profile_header,
      school_year: user.school_year,
      work_experiences_attributes: user.work_experiences_attributes
    };
    console.log(this.updateObj);
    if (user.provider == 'email')
      this.updateObj['email'] = user.uid;
  }

}
