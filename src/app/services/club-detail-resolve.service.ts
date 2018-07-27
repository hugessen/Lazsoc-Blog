import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { WebAPI } from './web-api.service';

@Injectable()
export class ClubDetailResolve implements Resolve<any> {
    constructor(private webAPI: WebAPI, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        let id = +route.params['id'];
        return this.webAPI.getClub(id).then(club => {
            console.log("Resolver", club);
            if (club) {
                return club;
            } else { // id not found
                this.router.navigate(['/newsfeed']);
                return false;
            }
        });
    }
}