import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ProfileResolve implements Resolve<any> {
    constructor(private authService: AuthService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        let id = +route.params['id'];
        return this.authService.getUser(id).then(userData => {
            if (userData) {
                return userData;
            } else { // id not found
                this.router.navigate(['/beans']);
                return false;
            }
        });
    }
}