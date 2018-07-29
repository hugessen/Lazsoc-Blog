import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class BeansResolve implements Resolve<any> {
    constructor(private authService: AuthService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return this.authService.getBeans().then(beans => {
            if (beans) {
                return beans;
            } else { // id not found
                console.log('something went wrong');
                this.router.navigate(['/newsfeed']);
                return false;
            }
        });
    }
}