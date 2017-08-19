import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Subject, Observable} from "rxjs";
import {Response} from "@angular/http";

@Injectable()
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();

  constructor(public authService:Angular2TokenService) {
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
        res => res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
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

}
