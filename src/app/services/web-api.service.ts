import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Event } from '../event';
import { JobPosting,JobPostingApplication } from '../models/job-posting';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebAPI {

  constructor(public http:Http) { }


  getNewsfeed(club?):Promise<any[]>{
    return new Promise((resolve,reject) => {
      Observable.forkJoin([
        Observable.fromPromise(this.getEvents()),
        Observable.fromPromise(this.getArticles()),
        Observable.fromPromise(this.getClubs(true))
      ]).subscribe(data => {
        var events = data[0];
        var articles = data[1];
        var clubs = data[2];
        var content;
        if(club)
          content = this.createNewsfeed(events,articles,clubs,club);
        else
          content = this.createNewsfeed(events,articles,clubs);
        resolve(content);
      })
    })
  }

  createNewsfeed(events, articles, clubs,club_id?):any{
    var result = []
    for (let event of events){
      event.typeof = "event";
      event.sortDate = event.start_date_time;
      var eventStart = Date.parse(event.start_date_time);
      var currentTime = new Date().getTime();
      if(eventStart > currentTime && (!club_id || club_id == event.club_id)){
        result.push(event);
      }
    }
    for(let article of articles){
      article.typeof = "article";
      article.sortDate = article.created_at;
      result.push(article);
    }

    result.sort(function(a,b){ 
      return Date.parse(a.sortDate) - Date.parse(b.sortDate)
    });
    
    return result;
  }

  getArticles():Promise<any[]>{    
    return new Promise((resolve,reject) => {
        this.http.get("http://localhost:3000/api/get_articles.json").map(res => res.json()).toPromise()
        .then(res => {
          console.log(res)
          resolve(res);
        }).catch(err => reject(err));
      })  
  }

  getArticle(id: number):Promise<any>{    
    return new Promise((resolve,reject) => {
        this.http.get("http://localhost:3000/api/get_article/"+id).map(res => res.json()).toPromise()
        .then(res => {
          console.log(res);
          resolve(res);
        }).catch(err => reject(err));
      })
  }

  getEvents():Promise<any[]>{
    return new Promise((resolve,reject) => {
        this.http.get("https://moria.lazsoc.ca/v2/api/events.json").map(res => res.json()).toPromise()
        .then(res => {
          this.sortByDate(res.events);
          resolve(res.events);
        }).catch(err => reject(err));
      })
  }

  getEvent(id: number): Promise<any> {
  return this.getEvents()
             .then(events => events.find(event => event.id === id));
  }

  registerForEvent(id:number){
    return new Promise((resolve,reject) => {
      this.http.get("http://localhost:3000/v2/api/events/register/"+id).map(res => res.json()).toPromise()
      .then(res => {
        resolve(res.events);
      }).catch(err => reject(err));
    })
  }


  getClubs(doTransform):Promise<any>{
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

  getClub(id:number):Promise<any>{
    return this.getClubs(false)
               .then(postings => postings.find(club => club.id === id));
  }

  getJobPostings():Promise<any>{
    return new Promise((resolve,reject) => {
      this.http.get("https://moria.lazsoc.ca/api/job_postings.json").map(res => res.json()).toPromise()
      .then(res => {
        var postings = this.trimJobPostings(res);
        resolve(postings);
      }).catch(err => reject(err));
    })
  }

  getDiscountPartners():Promise<any[]>{
    return new Promise((resolve,reject) => {
        this.http.get("https://moria.lazsoc.ca/v2/api/discount_partners.json").map(res => res.json()).toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => reject(err));
      })
  }

  getJobPosting(id: number): Promise<JobPosting> {
  return this.getJobPostings()
             .then(postings => postings.find(post => post.id === id));
  }


  submitJobApplication(data:JobPostingApplication){
    this.http.post('http://localhost:3000/api/submit_job_app',{job_posting_application:data}).subscribe(res => {
      console.log(res);
    });
  }

  transformClubs(clubs:any[]):Object{
    var result:Object = {};
    for (let club of clubs){
      club.club_social_links = this.formatSocialLinks(club.club_social_links);
      club.selected = false;
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

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  sortByDate(events){
    return events.sort(function(a,b){
      return Date.parse(a.start_date_time) - Date.parse(b.start_date_time)
    })
  }

  trimJobPostings(jobPostings){
    return jobPostings.filter(function(posting){
      var currentTime = new Date().getTime();
      return Date.parse(posting.expiry_date) > currentTime;
    })
  }
}
