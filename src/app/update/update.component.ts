import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';

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
    work_experiences_attributes: [{
      title:"",
      summary:"",
      started_date:"",
      end_date:"",
      is_current:false,
      company:""
    }]
  };
  private currentUser;

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private authService:AuthService) {
    this.currentUser = authService.authService.currentUserData;
  }

  ngOnInit() {
     //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
     this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
     //overide the onCompleteItem property of the uploader so we are
     //able to deal with the server response.
     this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
          console.log("ImageUpload:uploaded:", item, status, response);
      }
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


}
