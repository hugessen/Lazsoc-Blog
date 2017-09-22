import { Component, OnInit } from '@angular/core';
import {Angular2TokenService} from "angular2-token";

@Component({
  selector: 'app-oauthcallback',
  templateUrl: './oauthcallback.component.html',
  styleUrls: ['./oauthcallback.component.css']
})
export class OAuthCallbackComponent implements OnInit {

  constructor(private tokenService: Angular2TokenService) { }

  ngOnInit() {
    this.tokenService.processOAuthCallback();
  }

}
