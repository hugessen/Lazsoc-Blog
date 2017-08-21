import { Component, OnInit } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import { AuthService } from '../services/auth.service';
import {environment} from "../../environments/environment";
import { WebAPI } from '../services/web-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  private state = "LOGIN";
  loginObj = {email: "user@example.com", password: "monkey67"};
  registerObj = {email:"user@email.com",password:"password", passwordConfirmation:"password"};
  updateObj = {firstName:"Richard", lastName:"Hugessen", nickname:"Big Hoss",workExp:"I have some", program:"BBA/BCS"};
  profileInfoObj = {
    email:"",
    firstName:"",
    lastName:"",
    program:"",
  };
  constructor(private authService: AuthService, private tokenService: Angular2TokenService, private webAPI:WebAPI){
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
          console.log("login component says: ",this.tokenService.currentUserData)
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

  registerUser(){
    console.log("Registering");
    this.authService.registerUser(this.registerObj).subscribe(
        res => {
          if(res.status == 200){
            console.log("Successful Registration",res);
            // this.onFormResult.emit({signedIn: true, res});
          }
        },
        err => {
          console.log('Registration error', err);
          // this.onFormResult.emit({signedIn: false, err});
        }
    );
  }

  postUpdates(){
    this.authService.updateUser('update_user',this.updateObj);
  }

}
