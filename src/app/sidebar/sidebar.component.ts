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
  selector: 'event-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  events = [];
  clubs = {};
  eventCount = 0;
  constructor(public webAPI:WebAPI) {
    this.webAPI.getNewsfeed().then(res => this.events = res.filter(this.isThisWeek))
  }

  isThisWeek(event){
    let eventStart = new Date(event.start_date_time).getTime();
    let currentTime = new Date().getTime();
    return (eventStart <= currentTime + 60*60*24*30*1000);
  }

}

@Component({
  selector: 'profile-sidebar',
  templateUrl: './profile-sidebar.html',
  styleUrls: ['./sidebar.component.css']
})
export class ProfileSidebar implements OnInit {

  constructor(public authService:AuthService, public tokenService:Angular2TokenService, private router:Router) {
    console.log("Auth SErvice:",authService);
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
      Observable.fromPromise(webAPI.getClubs())
    ]).subscribe(data => {
      [this.jobPostings, this.clubs] = data;
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

  @Input() club: Club;

  constructor(public elementRef: ElementRef) {
    console.log("Club", this.club);
    // for(let link in this.club.club_social_links){
    //   console.log(this.club.club_social_links[link]);
    // }
  }

  ngOnInit() {
  }

}
