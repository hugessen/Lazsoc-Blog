import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebAPI {

  constructor(private http:Http) { }

  getEvents(){
    return this.http.get("https://moria.lazsoc.ca/v2/api/events.json").map(res => res.json()).toPromise();
  }

}
