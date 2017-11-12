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
        Observable.fromPromise(this.getBlogContent()),
        Observable.fromPromise(this.getClubs(true))
      ]).subscribe(data => {
        let events = data[0];
        let blogContent = data[1];
        let clubs = data[2];
        let content;
        if(club)
          content = this.createNewsfeed(events,blogContent,clubs,club);
        else
          content = this.createNewsfeed(events,blogContent,clubs);
        resolve(content);
      })
    })
  }

  createNewsfeed(events, blogContent, clubs,club_id?):any{
    let result = []
    for (let event of events){
      let eventStart = Date.parse(event.start_date_time);
      let currentTime = new Date().getTime();
      if(eventStart > currentTime && (!club_id || club_id == event.club_id)){
        result.push(event);
      }
    }
    return result;
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
      this.http.get("http://localhost:3000/api/job_postings.json").map(res => res.json()).toPromise()
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

  getBlogContent():Promise<any[]>{
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
