import { Component, OnInit, Input } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { GetMonth, GetDate } from '../pipes/get-long-date.pipe';

@Component({
  selector: 'sidebar-right',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  events = [];
  clubs = {};
  constructor(private webAPI:WebAPI) {
    Observable.forkJoin([
      Observable.fromPromise(webAPI.getNewsfeed()),
      Observable.fromPromise(webAPI.getClubs(true))
    ]).subscribe(data => {
      this.events = data[0];
      this.clubs = data[1];
    })
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

  constructor(private authService:AuthService, private tokenService:Angular2TokenService) {
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

  private jobPostings;
  private clubs;
  @Input() clubId: number;
  constructor(private webAPI:WebAPI, private router:Router) {
    Observable.forkJoin([
      Observable.fromPromise(webAPI.getJobPostings()),
      Observable.fromPromise(webAPI.getClubs(true))
    ]).subscribe(data => {
      this.jobPostings = data[0];
      this.clubs = data[1];
      if(this.clubId){

      }
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
