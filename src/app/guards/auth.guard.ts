import { Injectable }     from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Angular2TokenService} from 'angular2-token';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public authTokenService: Angular2TokenService,
              public router: Router) {}

  canActivate() {
    if (this.authTokenService.userSignedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
