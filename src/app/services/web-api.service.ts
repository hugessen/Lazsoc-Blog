import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Event } from '../event';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebAPI {

  constructor(private http:Http) { }


  getNewsfeed():Promise<any[]>{
    return new Promise((resolve,reject) => {
      Observable.forkJoin([
        Observable.fromPromise(this.getEvents()),
        Observable.fromPromise(this.getBlogContent()),
        Observable.fromPromise(this.getClubs(true))
      ]).subscribe(data => {
        var events = data[0];
        var blogContent = data[1];
        var clubs = data[2];
        console.log("blog content", blogContent);
        var content = this.createNewsfeed(events,blogContent,clubs);
        resolve(content);
      })
    })
  }

  createNewsfeed(events, blogContent, clubs):any[]{
      var result = [];
      for (let event of events){
        event.typeof = "event";
        result.push(event);
      }
      for (let post of blogContent){
        post.typeof = "blog";
        result.push(post);
      }
      result.sort(function(a,b){
          return Date.parse(a.start_date_time) - Date.parse(b.start_date_time)
      })
      console.log("Logging result");
      console.log(result);
      return result;
  }

  getEvents():Promise<any>{
    return new Promise((resolve,reject) => {
        this.http.get("https://moria.lazsoc.ca/v2/api/events.json").map(res => res.json()).toPromise()
        .then(res => {
          resolve(res.events);
        }).catch(err => reject(err));
      })
  }

  getEvent(id: number): Promise<any> {
  return this.getEvents()
             .then(events => events.find(event => event.id === id));
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

  getJobPostings(){
    return new Promise((resolve,reject) => {
        this.http.get("https://2e640c7e.ngrok.io/api/job_postings.json").map(res => res.json()).toPromise()
        .then(res => {
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


  getBlogContent(){
    return new Promise((resolve,reject) => {
        var result = [];
        for(var i = 0; i < 10; i++) {
          result.push({
            title: "Blog Post #" + i,
            start_date_time: this.randomDate(new Date(2017,9,1),new Date(2017,10,1)).toString(),
            sub_heading: "So, you're a Laurier business student now. What next?",
            author: "Richard Hugessen",
            text_body:"",
            banner: "assets/img/LazHall.jpg"
          })
        }
        resolve(result);
      })
  }
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
