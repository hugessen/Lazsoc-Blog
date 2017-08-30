import { Component, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
// import * as jquery from 'jquery';

@Component({
  selector:'laz-navbar',
  templateUrl:'laz-navbar.html',
  styleUrls: ['./laz-navbar.css']
})
export class LazNavbar {
  state = "login";
  modalActions = new EventEmitter<string>();
  loginObj = {email: "user@example.com", password: "monkey67"};
  registerObj = {email:"user@email.com",password:"password", passwordConfirmation:"password"};
  profileInfoObj = {
    email:"",
    firstName:"",
    lastName:"",
    program:"",
  };

  constructor(public router:Router, public authService:AuthService){

  };

  signOut(){
    this.authService.logOutUser();
    location.reload();
  }

  getUser() {
    if(this.authService.userSignedIn$){
      return this.authService.authService.currentUserData;
    }
    else return null;
  }


    signIn(){
      this.authService.logInUser(this.loginObj).subscribe(

          res => {

            console.log('auth response:', res);
            console.log('auth response headers: ', res.headers.toJSON()); //log the response header to show the auth token
            console.log('auth response body:', res.json()); //log the response body to show the user
            console.log("login component says: ",this.authService.authService.currentUserData)
          },

          err => {
            console.error('auth error:', err);
          }
      )
    }

    registerUser(){
      console.log("Registering");
      this.authService.registerUser(this.registerObj).subscribe(
          res => {
            if(res.status == 200){
              console.log("Successful Registration",res);
              console.log(this.authService.authService.currentUserData);
              // this.onFormResult.emit({signedIn: true, res});
            }
          },
          err => {
            console.log('Registration error', err);
            // this.onFormResult.emit({signedIn: false, err});
          }
      );
    }

}
