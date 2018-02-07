import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Event } from '../event';
import { JobPosting,JobPostingApplication } from '../models/job-posting';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
const API_PATH = "https://moria.lazsoc.ca"
const TIME_OFFSET = 60*60*5*1000;
// const API_PATH = "http://localhost:3000"

@Injectable()
export class WebAPI {
  constructor(public http:Http) { }

  getNewsfeed(club?):Promise<any[]>{
    return new Promise((resolve,reject) => {
      Observable.forkJoin([
        Observable.fromPromise(this.getEvents()),
        Observable.fromPromise(this.getClubs())
      ]).subscribe(data => {
        let [events, clubs] = data;
        if(club)
          var content = this.createNewsfeed(events, clubs, club);
        else
          var content = this.createNewsfeed(events, clubs);
        resolve(content);
      })
    })
  }

  createNewsfeed(events, clubs,club_id?):any{
    var result = []
    for (let event of events){
      event.club_name = clubs[event.club_id].name
      event.sortDate = event.start_date_time;
      var eventStart = Date.parse(event.start_date_time);
      var currentTime = new Date().getTime();
      if(eventStart > currentTime - TIME_OFFSET && (!club_id || club_id == event.club_id)){
        result.push(event);
      }
    }
    result.sort((a,b) => Date.parse(a.sortDate) - Date.parse(b.sortDate));   
    return result;
  }

  getArticles():Promise<any[]>{    
    return new Promise((resolve,reject) => {
      this.http.get(`${API_PATH}/api/get_articles`).map(res => res.json()).toPromise()
      .then(res => {
        res.sort( (a,b)=> Date.parse(b.created_at) - Date.parse(a.created_at));
        resolve(res);
      }).catch(err => reject(err));
    })  
  }

  getArticle(id: number):Promise<any>{    
    return new Promise((resolve,reject) => {
      this.http.get(`${API_PATH}/api/get_article/${id}`).map(res => res.json()).toPromise()
      .then(res => {
        // console.log(res);
        resolve(res);
      }).catch(err => reject(err));
    })
  }

  getEvents():Promise<any[]>{
    return new Promise((resolve,reject) => {
      this.http.get(`${API_PATH}/v2/api/events.json`).map(res => res.json()).toPromise()
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
      this.http.get(`${API_PATH}/v2/api/events/register/`+id).map(res => res.json()).toPromise()
      .then(res => {
        resolve(res.events);
      }).catch(err => reject(err));
    })
  }

  getClubs(arrayFormat = false):Promise<any>{
    return new Promise((resolve,reject) => {
      this.http.get(`${API_PATH}/v2/api/clubs.json`).map(res => res.json()).toPromise()
        .then(res => {
          if (arrayFormat) resolve(res)
          else resolve(this.transformClubs(res))
        })
        .catch(err => reject(err));
    })
  }

  getClub(id:number):Promise<any>{
    return new Promise((resolve,reject) => {
    this.getClubs(true)
       .then(res => {
         let club = res.find(club => club.id === id);
         club.club_social_links = this.formatSocialLinks(club.club_social_links);
         resolve(club);
       });
     })
  }

  getJobPostings():Promise<any>{
    return new Promise((resolve,reject) => {
      this.http.get(`${API_PATH}/api/job_postings.json`).map(res => res.json()).toPromise()
      .then(res => {
        var postings = this.trimJobPostings(res);
        resolve(postings);
      }).catch(err => reject(err));
    })
  }

  getDiscountPartners():Promise<any[]>{
    return new Promise((resolve,reject) => {
        this.http.get(`${API_PATH}/v2/api/discount_partners.json`).map(res => res.json()).toPromise()
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
    this.http.post(`${API_PATH}/api/submit_job_app`,{job_posting_application:data}).subscribe(res => {
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

  sortByDate(events){
    return events.sort(function(a,b){
      return Date.parse(a.start_date_time) - Date.parse(b.start_date_time)
    })
  }

  trimJobPostings(jobPostings){
    return jobPostings.filter(function(posting){
      let currentTime = new Date().getTime();
      return Date.parse(posting.expiry_date) > currentTime - TIME_OFFSET;
    })
  }
}
