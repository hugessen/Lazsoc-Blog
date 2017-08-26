import { Component, OnInit } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import { AuthService } from '../services/auth.service';
import {environment} from "../../environments/environment";
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
  loginObj = {email: "user@example.com", password: "monkey67"};
  registerObj = {email:"user@email.com",password:"password", passwordConfirmation:"password"};
  updateObj = {
    first_name:"Richard",
    last_name:"Hugessen",
    nickname:"Big Hoss",
    program:"BBA/BCS",
    summary:"oblique iracundia. Eam mutat adhuc semper ex, sit et quis tamquam assentior, iudico euismod sea ea.",
    is_bean:false,
    work_experiences_attributes: [{
      title:"Title",
      summary:"Lorem ipsum dolor sit amet, eam in facer liberavisse. Integre nostrud ceteros ex per, cu qui iriure oblique iracundia. Eam mutat adhuc semper ex, sit et quis tamquam assentior, iudico euismod sea ea. Eu usu nullam invidunt torquatos, eu tamquam argumentum mel.",
      started_date:"11/08/1995",
      end_date:"11/09/1995",
      is_current:false,
      company:"Lazaridis Students' Society"
    }]
  };
  profileInfoObj = {
    email:"",
    firstName:"",
    lastName:"",
    program:"",
  };
  constructor(private authService: AuthService, private tokenService: Angular2TokenService, private webAPI:WebAPI, private route: ActivatedRoute){
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
            this.state = "UPDATE";
            console.log(this.tokenService.currentUserData);
            // this.onFormResult.emit({signedIn: true, res});
          }
        },
        err => {
          console.log('Registration error', err);
          // this.onFormResult.emit({signedIn: false, err});
        }
    );
  }
  addWorkExp(){
    this.updateObj.work_experiences_attributes.push({
      title:"Title",
      summary:"",
      started_date:"",
      end_date:"",
      is_current:false,
      company:""
    })
  }
  removeWorkExp(index){
    this.updateObj.work_experiences_attributes.splice(index,1);
    console.log(this.updateObj.work_experiences_attributes);
  }

  postUpdates(){
    this.authService.updateUser('update_user',this.updateObj);
  }

}
