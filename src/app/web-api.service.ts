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

  getNewsfeed():Promise<any>{
    return new Promise((resolve,reject) => {
      this.getEvents().then(res => {
        var events = res.events;
        events.sort(function(a,b){
            return Date.parse(a.start_date_time) - Date.parse(b.start_date_time)
        })
        resolve(events);
      })
    })
  }

  getClubs(doTransform){
    return new Promise((resolve,reject) => {
        this.http.get("https://moria.lazsoc.ca/v2/api/clubs.json").map(res => res.json()).toPromise()
        .then(res => {
            if(doTransform)
                resolve(this.transformClubs(res));
            else
                resolve(res);
        }).catch(err => reject(err));
      })
  }

  transformClubs(clubs:any[]):Object{
      var result:Object = {};
      for (let club of clubs){
          club.club_social_links = this.formatSocialLinks(club.club_social_links);
          result[club.id.toString()] = club;
      }
      return result;
  }

  formatSocialLinks(socialLinks:any[]):Object{
      var result:Object = {};
      for (let link of socialLinks){
          result[link.link_type] = link.url;
      }
      return result;
  }

}
