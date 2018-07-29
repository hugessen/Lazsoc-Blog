import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserResolve implements Resolve<any> {
    constructor(private authService: AuthService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return this.authService.getUserAsync().then(user => {
            if (user) {
                return user;
            } else { // id not found
                this.router.navigate(['/newsfeed']);
                return false;
            }
        });
    }
}