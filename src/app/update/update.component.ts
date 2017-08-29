import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';

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
    nickname:"",
    program:"",
    summary:"",
    is_bean:true,
    avatar_file: null,
    work_experiences_attributes: [{
      title:"",
      summary:"",
      started_date:"",
      end_date:"",
      is_current:false,
      company:""
    }]
  };
  @ViewChild('fileInput') fileInput;
  private currentUser;

  constructor(private authService:AuthService) {
    this.currentUser = authService.authService.currentUserData;
  }

  ngOnInit() {
  }

  fileChangeEvents(fileInput: any) {
      this.updateObj.avatar_file = fileInput.target.files;
    }

  addWorkExp(){
    this.updateObj.work_experiences_attributes.push({
      title:"Title",
      summary:"",
      started_date:"",
      end_date:"",
      is_current:false,
      company:""
    })
  }
  removeWorkExp(index){
    this.updateObj.work_experiences_attributes.splice(index,1);
    console.log(this.updateObj.work_experiences_attributes);
  }

  postUpdates(){
    this.authService.updateUser('update_user',this.updateObj);
  }

  upload(){
    let fileBrowser = this.fileInput.nativeElement;
      if (fileBrowser.files && fileBrowser.files[0]) {
        const formData = new FormData();
        formData.append("image", fileBrowser.files[0]);
        this.authService.upload(formData).subscribe(res => {
          // do stuff w/my uploaded file
        });
    }
  }

}
