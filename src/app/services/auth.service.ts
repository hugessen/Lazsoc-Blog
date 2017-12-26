import { Injectable, OnInit } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Subject, Observable} from "rxjs";
import {Response, Http, RequestOptions} from "@angular/http";

@Injectable()
export class AuthService implements OnInit {

  userSignedIn$:boolean = false;

  constructor(public authService:Angular2TokenService, public http:Http)  {
    this.authService.init({
        apiBase:                    'http://localhost:3000/api',
        apiPath:                    null,

        signInPath:                 'user_auth/sign_in',
        signInRedirect:             null,
        signInStoredUrlStorageKey:  null,

        signOutPath:                'user_auth/sign_out',
        validateTokenPath:          'user_auth/validate_token',
        signOutFailedValidate:      false,

        registerAccountPath:        'user_auth',
        deleteAccountPath:          'user_auth',
        registerAccountCallback:    window.location.href,

        updatePasswordPath:         'user_auth',
        resetPasswordPath:          'user_auth/password',
        resetPasswordCallback:      window.location.href,

        oAuthBase:                  window.location.origin,
        oAuthPaths: {
            github:                 'user_auth/github'
        },
        oAuthCallbackPath:          'oauth_callback',
        oAuthWindowType:            'newWindow',
        oAuthWindowOptions:         null,

        userTypes:[
          { name: 'ADMIN', path: 'admin' },
          { name: 'USER', path: 'user' }
        ],

        globalOptions: {
            headers: {
                'Content-Type':     'application/json',
                'Accept':           'application/json'
            }
        }
    });
    this.authService.validateToken().subscribe(
        res => {
          if(res.status == 200){
            console.log("Signed in");
            this.userSignedIn$ = true;
            console.log(authService.currentUserData);
          }
          else {
            console.log("Sign in failed");
            this.userSignedIn$ = false;
          }
        }
    )
  }

  ngOnInit(){
    console.log("I am run");
  }

  logOutUser():Observable<Response>{
    return this.authService.signOut().map(
        res => {
          this.userSignedIn$ = false;
          return res;
        }
    );
  }

  registerUser(signUpData:  {email:string, password:string, passwordConfirmation:string}):Observable<Response>{
    return this.authService.registerAccount(signUpData).map(
        res => {
          this.userSignedIn$ = true;
          return res
        }
    );
  }

  logInUser(signInData: {email:string, password:string}):Observable<Response>{

    return this.authService.signIn(signInData).map(
      res => {
        this.userSignedIn$ = true;
        return res
      }
    );

  }
  updateUser(data:any):Promise<any>{
    return new Promise((resolve,reject) => {
      this.authService.post('update_user',data).toPromise().then(res => {
        resolve(res);
      })
    });
  }

  getBeans(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiGet('beans/get_all.json').then(res => {
        resolve(res);
       });
    })
  }
  getBean(id: number): Promise<any> {
  return this.getBeans()
   .then(beans => beans.find(bean => bean.id === id));
  }

  apiGet(path:string, data:any = null):Promise<any>{
     return new Promise((resolve,reject)=> {
      this.authService.get(path,data).map(res => res.json()).toPromise()
      .then(res=>{
        resolve(res);
      }).catch(err => reject(err));
    });
  }

  public apiPost(path:string, data:any){
    return new Promise((resolve,reject)=> {
      this.authService.post(path,data).map(res => res.json()).toPromise()
      .then(res=>{
        resolve(res);
      }).catch(err => reject(err));
    });
  }

  // public getAuthDataFromStorage() {
  //   return {
  //       accessToken:    localStorage.getItem('accessToken'),
  //       client:         localStorage.getItem('client'),
  //       expiry:         localStorage.getItem('expiry'),
  //       tokenType:      localStorage.getItem('tokenType'),
  //       uid:            localStorage.getItem('uid')
  //   };
  // }

  // upload(formData) {
  //   let headers = this.authService.currentAuthHeaders;
  //   headers.delete('Content-Type');
  //   let options = new RequestOptions({ headers: headers });
  //   console.log(formData);
  //   return this.authService.request({
  //     method: 'post',
  //     url: `http://localhost:3000/api/upload_avatar`,
  //     body: formData,
  //     headers: options.headers
  //   }).map(res => res.json());
  // }
}