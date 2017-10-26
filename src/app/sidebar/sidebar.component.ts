import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { GetMonth, GetDate, GetShortDate } from '../pipes/get-long-date.pipe';
import { MapToIterablePipe } from '../pipes/map-to-iterable.pipe';
import { Club } from '../models/club';

@Component({
  selector: 'sidebar-right',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  events = [];
  clubs = {};
  eventCount = 0;
  constructor(public webAPI:WebAPI) {
    Observable.forkJoin([
      Observable.fromPromise(webAPI.getNewsfeed()),
      Observable.fromPromise(webAPI.getClubs(true))
    ]).subscribe(data => {
      this.events = data[0];
      this.clubs = data[1];
    })
  }

  isThisWeek(event){
    var eventStart = new Date(event.start_date_time).getTime();
    var currentTime = new Date().getTime();
    return (eventStart <= currentTime + 60*60*24*7*1000);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'profile-sidebar',
  templateUrl: './profile-sidebar.html',
  styleUrls: ['./sidebar.component.css']
})
export class ProfileSidebar implements OnInit {

  constructor(public authService:AuthService, public tokenService:Angular2TokenService, private router:Router) {
    console.log("profile sidebar says: ", tokenService.currentUserData);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'job-posting-sidebar',
  templateUrl: './job-posting-sidebar.html',
  styleUrls: ['./sidebar.component.css']
})
export class JobPostingSidebar implements OnInit {

  public jobPostings;
  public clubs;
  hasPostings = true;
  @Input() clubID;

  constructor(public webAPI:WebAPI, public router:Router) {
    Observable.forkJoin([
      Observable.fromPromise(webAPI.getJobPostings()),
      Observable.fromPromise(webAPI.getClubs(true))
    ]).subscribe(data => {
      this.jobPostings = data[0];
      this.clubs = data[1];
      console.log(this.jobPostings);
    })
  }

  ngOnInit() {
  }

  viewJobPost(id:number){
    this.router.navigate(['/hiring',id]);
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }

}

@Component({
  selector: 'social-links-sidebar',
  templateUrl: './social-links-sidebar.html',
  styleUrls: ['./sidebar.component.css']
})
export class SocialLinksSidebar implements OnInit {

  @Input() club:Club;

  constructor(public elementRef: ElementRef) {
    // for(let link in this.club.club_social_links){
    //   console.log(this.club.club_social_links[link]);
    // }
  }

  ngOnInit() {
  }

}
