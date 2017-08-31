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
  user:any;
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

        res => {

          console.log('auth response:', res);
          console.log('auth response headers: ', res.headers.toJSON()); //log the response header to show the auth token
          console.log('auth response body:', res.json()); //log the response body to show the user
          this.user = res.json().data;
          console.log("login component says: ",this.tokenService.currentUserData);
          this.router.navigateByUrl('/newsfeed');
        },

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
    console.log("Registering");
    this.authService.registerUser(this.registerObj).subscribe(
        res => {
          if(res.status == 200){
            console.log("Successful Registration",res);
            this.router.navigateByUrl('/update');
            console.log(this.tokenService.currentUserData);
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

}
