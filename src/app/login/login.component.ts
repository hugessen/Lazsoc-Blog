import { Component, OnInit } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import { AuthService } from '../services/auth.service';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  loginObj = {email: "user@example.com", password: "monkey67"};
  registerObj = {email:"",password:"", passConf:""};
  constructor(private authService: AuthService){
    // this.authToken.init(environment.token_auth_config);
  }


  ngOnInit() {
  }
  signIn(){
    this.authService.logInUser(this.loginObj).subscribe(

        res => {

          console.log('auth response:', res);
          console.log('auth response headers: ', res.headers.toJSON()); //log the response header to show the auth token
          console.log('auth response body:', res.json()); //log the response body to show the user
          this.user = res.json().data;
        },

        err => {
          console.error('auth error:', err);
        }
    )
  }
  signOut(){
    this.authService.logOutUser().subscribe(
        res =>      console.log(res),
        error =>    console.log(error)
    );
  }

}
