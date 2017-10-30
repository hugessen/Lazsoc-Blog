import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';

const URL = 'http://localhost:3000/api/upload_avatar';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateObj:{};
  work_experiences_attributes = [{
    title:"",
    summary:"",
    started_date:"",
    end_date:"",
    is_current:false,
    company:""
  }];
  // @ViewChild('fileInput') fileInput;
  public currentUser;

  constructor(public authService:AuthService) {
    this.currentUser = authService.authService.currentUserData;
    console.log(this.currentUser);
    this.initUpdateObj();
  }

  ngOnInit() {
  }

  // fileChangeEvents(fileInput: any) {
  //     this.updateObj.avatar_file = fileInput.target.files;
  //   }

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
    console.log(this.work_experiences_attributes);
  }

  postUpdates(){
    this.authService.updateUser('update_user',this.updateObj).then(res => {
      console.log("Res:", res);
      console.log(this.authService.authService.currentUserData);
    })
  }

  initUpdateObj(){
    this.updateObj = {
      first_name:this.currentUser.first_name,
      last_name:this.currentUser.last_name,
      program:this.currentUser.program,
      summary:this.currentUser.summary,
      is_bean:this.currentUser.isBean,
      profile_header:this.currentUser.profile_header,
      school_year:this.currentUser.school_year,
    };
  }

  // upload(){
  //   let fileBrowser = this.fileInput.nativeElement;
  //     if (fileBrowser.files && fileBrowser.files[0]) {
  //       const formData = new FormData();
  //       formData.append("image", fileBrowser.files[0]);
  //       this.authService.upload(formData).subscribe(res => {
  //         // do stuff w/my uploaded file
  //       });
  //   }
  // }

}
