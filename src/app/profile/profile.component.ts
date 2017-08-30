import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser:User = new User();
  state = "about"

  constructor(public tokenService: Angular2TokenService, public route: ActivatedRoute, public router: Router, public authService:AuthService) {

  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.authService.getBean(+params.get('id')))
      .subscribe((event) => this.currentUser = event);
  }

  getCurrentUser(){}

}
