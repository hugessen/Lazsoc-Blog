import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../web-api.service';
import { Observable } from 'rxjs/Rx';
import { GetLongDate } from '../get-long-date.pipe';
import { Event } from '../event';
import { Router } from '@angular/router';
import * as Stickyfill from 'stickyfill';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  events = [];
  clubs = {};
  newsfeedState = "all";
  content = [];

  constructor(private router: Router, private webAPI: WebAPI) {
    Observable.forkJoin([
      Observable.fromPromise(webAPI.getNewsfeed()),
      Observable.fromPromise(webAPI.getClubs(true))
    ]).subscribe(data => {
      this.events = data[0];
      this.clubs = data[1];
      // console.log(this.events);
      console.log(this.events);
    })
    // this.webAPI.getEvents().then(res => {
    //   this.events = res.events;
    //   console.log(this.events);
    // });
    // this.webAPI.getClubs(true).then(res => {
    //   this.clubs = res;
    // })
  }

  ngOnInit() {
  }

  onSelect(event){
    this.router.navigate(['/events',event.id]);
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }

  setNewsfeedState(state:string){
    this.newsfeedState = state;
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }

  doSticky(){
    var stickyElements = document.getElementsByClassName('sticky');
    for (var i = stickyElements.length - 1; i >= 0; i--) {
    Stickyfill.add(stickyElements[i]);
  }
  Stickyfill.add(document.getElementsByClassName('sticky-updates'));

  }
}
