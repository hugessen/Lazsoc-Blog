import { Injectable, OnInit } from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {Subject, Observable} from 'rxjs';
import {Response, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService implements OnInit {

  userSignedIn$ = false;
  currentUser = null;

  constructor(public tokenService: Angular2TokenService, public http: HttpClient)  {
    this.tokenService.init({
        apiBase:                    'https://moria.lazsoc.ca/api',
        // apiBase:                    'http://localhost:3000/api',
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

        oAuthBase:                  'http://localhost:3000/api',
        oAuthPaths: {
            linkedin:               'user_auth/linkedin'
        },
        oAuthCallbackPath:          'oauth_callback',
        oAuthWindowType:            'newWindow',
        oAuthWindowOptions:         null,

        userTypes: [
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
    this.tokenService.validateToken().subscribe(
        res => {
          if (res.status === 200) {
            console.log( 'Signed in');
            this.userSignedIn$ = true;
            this.currentUser = res.json().data;
            console.log( 'CurrUser', this.currentUser)
          } else {
            console.log('Sign in failed');
            this.userSignedIn$ = false;
          }
        }
    )
  }

  ngOnInit() {
    console.log( 'I am run');
  }

  logOutUser(): Observable<Response> {
    return this.tokenService.signOut().map(
        res => {
          this.userSignedIn$ = false;
          return res;
        }
    );
  }

  getUserAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.tokenService.validateToken().toPromise().then(res => {
        let user = res.json().data
        this.getSmilePoints(user.email).then(points => {
          user.points = points;
        }).catch(err => console.log("Problem getting smile points:", err));
        resolve(user)
      });
    })
  }

  getCurrentUser(): any {
    return this.tokenService.currentUserData;
  }

  registerUser(signUpData:  {email: string, password: string, passwordConfirmation: string}): Observable<Response> {
    return this.tokenService.registerAccount(signUpData).map(
        res => {
          return res;
        }
    );
  }

  logInUser(signInData: { email: string, password: string }): Observable<any> {
    return this.tokenService.signIn(signInData).map(
      res => {
        this.userSignedIn$ = true;
        return { res: res, needsUpdate: !res.json().data.has_updated }
      }
    );
  }

  updateUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.tokenService.post('update_user', data).toPromise().then(res => {
        resolve(res);
      }).catch(err => reject(err))
    });
  }

  getBeans(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGet('beans/get_all.json').then(res => {
        resolve(res);
       });
    })
  }

  getUser(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGet(`get_user/${id}`).then(res => {
        // console.log(res);
        resolve(res);
      })
    })
  }

  getSmilePoints(email): Promise<any> {
    return new Promise((resolve,reject) => {  
      this.http.get(`https://api.sweettooth.io/v1/customers?email=${email}`, { headers: new HttpHeaders({Authorization: `Bearer ${environment.SMILE_SECRET}`})})
        .toPromise().then(res => resolve(res));
    })
  }

  apiGet(path: string, data: any = null): Promise<any> {
     return new Promise((resolve, reject) => {
      this.tokenService.get(path, data).map(res => res.json()).toPromise()
      .then(res => {
        resolve(res);
      }).catch(err => reject(err));
    });
  }

  public apiPost(path: string, data: any) {
    return new Promise((resolve, reject) => {
      this.tokenService.post(path, data).map(res => res.json()).toPromise()
      .then(res => {
        resolve(res);
      }).catch(err => reject(err));
    });
  }

  loginOauth(): Observable<any> {
    return this.tokenService.signInOAuth('linkedin')
  }
}
