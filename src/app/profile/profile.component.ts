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

  constructor(public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => { this.user = data.user; console.log(this.user); });
  }

  getCurrentUser() {}

}
