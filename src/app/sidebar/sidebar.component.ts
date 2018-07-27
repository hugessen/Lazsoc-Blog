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
  templateUrl: './event-sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  clubs = {};
  eventCount = 0;
  anyEvents = true;

  @Input() clubEvents;

  constructor(public webAPI: WebAPI) {
  }

  ngOnInit() {
    this.clubEvents = this.clubEvents.filter(this.isThisWeek);
    if (this.clubEvents.length === 0) { this.anyEvents = false; }
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
  templateUrl: './hiring-sidebar.html',
  styleUrls: ['./hiring-sidebar.css']
})
export class JobPostingSidebar implements OnInit {

  public jobPostings;
  hasPostings = false;
  @Input() clubID;

  constructor(public webAPI: WebAPI, public router: Router) {
  }

  ngOnInit() {
    this.webAPI.getJobPostings().then(data => {
      this.jobPostings = data;
      if (this.clubID !== 0)
        this.jobPostings.filter(posting => posting.club === this.clubID);
      if (this.jobPostings.length > 0)
        this.hasPostings = true;
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
