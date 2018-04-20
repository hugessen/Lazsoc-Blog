import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from 'angular2-token';
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
  anyEvents = true;
  constructor(public webAPI: WebAPI) {
    this.webAPI.getNewsfeed().then(res => {
      this.events = res.filter(this.isThisWeek);
      if (this.events.length == 0) { this.anyEvents = false; }
    })
  }

  isThisWeek(event) {
    const eventStart = new Date(event.start_date_time).getTime();
    const currentTime = new Date().getTime();
    return (eventStart <= currentTime + 60 * 60 * 24 * 7 * 1000);
  }

}

@Component({
  selector: 'profile-sidebar',
  templateUrl: './profile-sidebar.html',
  styleUrls: ['./sidebar.component.css']
})
export class ProfileSidebar implements OnInit {

  currentUser = {};

  constructor(public authService: AuthService, public tokenService: Angular2TokenService, private router: Router) {
    this.authService.getUserAsync().then(res => this.currentUser = res );
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
  hasPostings = false;
  @Input() clubID;

  constructor(public webAPI: WebAPI, public router: Router) {
  }

  ngOnInit() {
    Observable.forkJoin([
      Observable.fromPromise(this.webAPI.getJobPostings()),
      Observable.fromPromise(this.webAPI.getClubs())
    ]).subscribe(data => {
      [this.jobPostings, this.clubs] = data;
      if (this.clubID != 0) {
        for (const posting of this.jobPostings) {
          console.log(posting.club_id);
          console.log(this.clubID);
          if (posting.club_id == this.clubID) {
            this.hasPostings = true;
            break;
          }
        }
      } else if (this.jobPostings.length > 0) { this.hasPostings = true; }
    })
  }

  viewJobPost(id: number) {
    this.router.navigate(['/hiring', id]);
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
    // console.log("Club", this.club);
    // for(let link in this.club.club_social_links){
    //   console.log(this.club.club_social_links[link]);
    // }
  }

  ngOnInit() {
  }

}
