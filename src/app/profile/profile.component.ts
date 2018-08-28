import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  state = 'about'
  user;
  work_experiences;
  is_current_user;
  inviteMessage = "";

  constructor(public route: ActivatedRoute, public router: Router, public authService: AuthService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => { 
      console.log(data);
      this.user = data.userData.user;
      this.work_experiences = data.userData.work_experiences;
      this.is_current_user = data.userData.is_current_user;
    });
  }

  invite() {
    this.authService.apiPost(`beans/send_invite/${this.user.id}`,{message:this.inviteMessage}).then(res => {
      console.log("This worked");
    })
  }

}
