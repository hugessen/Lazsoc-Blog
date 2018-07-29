import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { WebAPI } from '../services/web-api.service';

@Injectable()
export class NewsfeedResolve implements Resolve<any> {
    constructor(private webAPI: WebAPI, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return this.webAPI.getNewsfeed().then(feeds => {
            if (feeds) {
                return feeds;
            } else { // id not found
                this.router.navigate(['/home']);
                return false;
            }
        });
    }
}