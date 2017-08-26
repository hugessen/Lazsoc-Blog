import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  current_user = {};

  constructor(private tokenService: Angular2TokenService) {
  }

  ngOnInit() {
  }

}
