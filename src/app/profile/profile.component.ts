import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  inviteQuestions = [
    {question:"What do you hope to accomplish from this conversation?", answer: ""},
    {question:"What do you hope to accomplish from this conversation?", answer: ""},
    {question:"What do you hope to accomplish from this conversation?", answer: ""}
  ]

  constructor(public route: ActivatedRoute, public router: Router) {
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
    
  }

}
