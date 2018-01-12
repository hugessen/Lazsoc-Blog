import { Component, OnInit } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import { AuthService } from '../services/auth.service';
import { environment } from "../../environments/environment";
import { WebAPI } from '../services/web-api.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  state:string = "login"
  loginObj = {email: "", password: ""};
  registerObj = {email:"",password:"", passwordConfirmation:""};
  profileInfoObj = {
    email:"",
    firstName:"",
    lastName:"",
    program:"",
  };
  hasLoginError = false;
  hasRegisterError = false;
  errors = [];
  constructor(public authService: AuthService, public tokenService: Angular2TokenService, public webAPI:WebAPI, public route: ActivatedRoute, public router:Router){
    // this.authToken.init(environment.token_auth_config);
  }


  ngOnInit() {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) =>
    //     this.state = params.get('state'));
  }

  signIn(){
    this.authService.logInUser(this.loginObj).subscribe(
        res => this.router.navigateByUrl('/newsfeed'),

        err => {
          this.hasLoginError = true;
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
    this.errors = [];
    if (!this.isValidEmail(this.registerObj.email))
      this.errors.push("Invalid @mylaurier email");
    if (this.registerObj.password != this.registerObj.passwordConfirmation)
      this.errors.push("Passwords don't match");
    if (this.errors.length > 0) 
      return;
    this.registerObj.email = `${this.registerObj.email}@mylaurier.ca`
    this.authService.registerUser(this.registerObj).subscribe(
        res => {
          if(res.status == 200){
            this.router.navigateByUrl('/update');
            // this.onFormResult.emit({signedIn: true, res});
          }
        },
        err => {
          console.log('Registration error', err);
          this.hasRegisterError = true;
          // this.onFormResult.emit({signedIn: false, err});
        }
    );
  }
  isValidEmail(email) {
    return email.length == 8 && this.isChars(email.substring(0,4)) && this.isNumeric(email.substring(4));
  }

  isChars(str){
    return /^[a-zA-Z]/.test(str);
  }

  isNumeric(str){
    return /^\d+$/.test(str); //Somehow this checks if a value is numeric. Unfortunately isNaN() doesn't like strings in TypeScript
  }

}
