import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService:AuthService) {
    this.currentUser = authService.authService.currentUserData;
  }

  ngOnInit() {

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
