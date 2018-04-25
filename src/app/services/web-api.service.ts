import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Event } from '../event';
import { JobPosting, JobPostingApplication } from '../models/job-posting';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
const API_PATH = 'https://moria.lazsoc.ca'
const TIME_OFFSET = 60 * 60 * 5 * 1000;
const LOCAL_PATH = 'http://localhost:3000'

@Injectable()
export class WebAPI {
  constructor(public http: Http) { }

  getNewsfeed(club?): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Observable.forkJoin([
        Observable.fromPromise(this.getEvents()),
        Observable.fromPromise(this.getClubs())
      ]).subscribe(data => {
        const [events, clubs] = data;
        let content;
        if (club) {
          content = this.createNewsfeed(events, clubs, club);
        } else {
          content = this.createNewsfeed(events, clubs);
        }
        resolve(content);
      })
    })
  }

  createNewsfeed(events, clubs, club_id?): any {
    const result = []
    for (const event of events) {
      event.club = clubs.find(club => club.id === event.club_id);
      const eventStart = Date.parse(event.start_date_time);
      const currentTime = new Date().getTime();
      if (eventStart > currentTime - TIME_OFFSET && (!club_id || club_id === event.club_id)) {
        result.push(event);
      }
    }
    result.sort((a, b) => Date.parse(a.start_date_time) - Date.parse(b.start_date_time));
    return result;
  }

  getArticles(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${API_PATH}/api/get_articles`).map(res => res.json()).toPromise()
      .then(res => {
        res.sort( (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
        resolve(res);
      }).catch(err => reject(err));
    })
  }

  getArticle(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${API_PATH}/api/get_article/${id}`).map(res => res.json()).toPromise()
      .then(res => {
        // console.log(res);
        resolve(res);
      }).catch(err => reject(err));
    })
  }

  getEvents(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${LOCAL_PATH}/api/events.json`).map(res => res.json()).toPromise()
      .then(res => {
        res.events.sort((a, b) => Date.parse(a.start_date_time) - Date.parse(b.start_date_time));
        resolve(res.events);
      }).catch(err => reject(err));
    })
  }

  getEvent(id: number): Promise<any> {
  return this.getEvents()
             .then(events => events.find(event => event.id === id));
  }

  getClubs(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${LOCAL_PATH}/api/clubs.json`).map(res => res.json()).toPromise()
        .then(res => {
          res.map(club => {
            club.club_social_links = this.formatSocialLinks(club.club_social_links);
          })
          resolve(res);
        })
        .catch(err => reject(err));
    })
  }

  getClub(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
    this.getClubs()
       .then(res => {
         const club = res.find(club => club.id === id);
         club.club_social_links = this.formatSocialLinks(club.club_social_links);
         resolve(club);
       });
     })
  }

  getJobPostings(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${LOCAL_PATH}/api/job_postings.json`).map(res => res.json()).toPromise()
      .then(res => {
        const postings = this.trimJobPostings(res);
        this.getClubs().then(clubs => {
          postings.map(posting => {
            posting.club = clubs.find(club => club.id === posting.club_id);
          })
        })
        resolve(postings);
      }).catch(err => reject(err));
    })
  }

  getDiscountPartners(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        this.http.get(`${LOCAL_PATH}/api/discount_partners.json`).map(res => res.json()).toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => reject(err));
      })
  }

  getJobPosting(id: number): Promise<JobPosting> {
  return this.getJobPostings()
             .then(postings => postings.find(post => post.id === id));
  }


  submitJobApplication(data: JobPostingApplication) {
    this.http.post(`${API_PATH}/api/submit_job_app`, { job_posting_application: data }).subscribe(res => {
      console.log(res);
    });
  }

  formatSocialLinks(socialLinks: any[]) {
    const result = {};
    for (const link of socialLinks) {
      result[link.link_type] = link.url;
    }
    return result;
  }

  trimJobPostings(jobPostings) {
    return jobPostings.filter(function(posting) {
      const currentTime = new Date().getTime();
      return Date.parse(posting.expiry_date) > currentTime - TIME_OFFSET;
    })
  }
}
