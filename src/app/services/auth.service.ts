import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Subject, Observable} from "rxjs";
import {Response, Http, RequestOptions} from "@angular/http";

@Injectable()
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();

  constructor(public authService:Angular2TokenService, private http:Http) {
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
            this.userSignedIn$.next(res.json().success);
          }
          else {
            this.userSignedIn$.next(false);
          }
        }
    )
  }

  logOutUser():Observable<Response>{

    return this.authService.signOut().map(
        res => {
          this.userSignedIn$.next(false);
          return res;
        }
    );
  }

  registerUser(signUpData:  {email:string, password:string, passwordConfirmation:string}):Observable<Response>{
    return this.authService.registerAccount(signUpData).map(
        res => {
          this.userSignedIn$.next(true);
          return res
        }
    );
  }

  logInUser(signInData: {email:string, password:string}):Observable<Response>{

    return this.authService.signIn(signInData).map(
        res => {
          this.userSignedIn$.next(true);
          return res
        }
    );

  }
  updateUser(path:string, data:any){
    this.authService.post(path,data).toPromise().then(res => {
      console.log(res);
    })
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

  apiPost(path:string, data:any){
    return new Promise((resolve,reject)=> {
      this.authService.post(path,data).map(res => res.json()).toPromise()
      .then(res=>{
        resolve(res);
      }).catch(err => reject(err));
    });
  }

  private getAuthDataFromStorage() {
    return {
        accessToken:    localStorage.getItem('accessToken'),
        client:         localStorage.getItem('client'),
        expiry:         localStorage.getItem('expiry'),
        tokenType:      localStorage.getItem('tokenType'),
        uid:            localStorage.getItem('uid')
    };
  }

  upload(formData) {
    let headers = this.authService.currentAuthHeaders;
    headers.delete('Content-Type');
    let options = new RequestOptions({ headers: headers });
    console.log(formData);
    return this.authService.request({
      method: 'post',
      url: `http://localhost:3000/api/upload_avatar`,
      body: formData,
      headers: options.headers
    }).map(res => res.json());
  }
}
