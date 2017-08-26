import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser = {};

  constructor(private tokenService: Angular2TokenService, private route: ActivatedRoute, private router: Router, private authService:AuthService) {

  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.authService.getBean(+params.get('id')))
      .subscribe((event) => this.currentUser = event);
  }

  getCurrentUser(){}

}
