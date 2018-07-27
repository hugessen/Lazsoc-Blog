import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
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
        return new Promise((resolve,reject) => {
            Observable.forkJoin(
                Observable.fromPromise(this.webAPI.getClub(id)),
                Observable.fromPromise(this.webAPI.getEventsByClub(id))
            ).subscribe(data => {
                resolve({club: data[0], clubEvents: data[1]})
            })
    })
    }
}