import { Component, OnInit, Input } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { Observable } from 'rxjs/Rx';
import { GetLongDate } from '../pipes/get-long-date.pipe';
import { Event } from '../event';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as Stickyfill from 'stickyfill';
import * as _ from "lodash";

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  events:any;
  clubs = {};
  newsfeedState = "all";
  hasEvents:boolean = true;
  tagFilters:any[] = [];
  clubFilters:any[] = [];
  timeFilter:any = "";


  @Input() clubID;

  constructor(public router: Router, public webAPI: WebAPI, public authService: AuthService) {
    Observable.forkJoin([
      Observable.fromPromise(webAPI.getNewsfeed(this.clubID)),
      Observable.fromPromise(webAPI.getClubs(true))
    ]).subscribe(data => {
      this.events = data[0];
      this.clubs = data[1];
      console.log(this.events);
      this.hasEvents = this.checkHasEvents();
    })
  }

  ngOnInit() {
    console.log(this.clubID);
  }

  vote(event){
    this.authService.apiPost('articles/'+event.id+'/vote', null).then(res => {
      console.log(res)
    });
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
  checkHasEvents():boolean{
    if(this.clubID != 0){
      for(let event of this.events){
        if (event.club_id === this.clubID)
          return true;
      }
      return false;
    } else return true;
  }

  addTagFilter(tag){
    this.tagFilters.push(tag);
  }

  removeTagFilter(tag){
    _.pull(this.tagFilters,tag);
  }

  addClubFilter(clubSlug){
    this.clubFilters.push(clubSlug);
  }

  removeClubFilter(clubSlug) {
    _.pull(this.clubFilters,clubSlug);
  }

  addTimeFilter(timeframe){
    this.timeFilter.push(timeframe);
  }

  removeTimeFilter(timeframe) {
    _.pull(this.timeFilter,timeframe);
  }

  isVisible(event) {
    return (this.matchesTags(event) && this.matchesClub(event) && this.matchesTimeframe(event))
  }

  matchesTags(event){
    if (this.tagFilters.length > 0){
      for(let tag of event.event_tags){
        if(_.indexOf(this.tagFilters, tag.tag) != -1)
          return true;
      }
      return false;
    }
    return true;
  }

  matchesClub(event) {
    let slug = this.clubs[event.club_id].slug;
    return this.clubFilters.length == 0 || _.indexOf(this.clubFilters, slug) != -1;
  }

  matchesTimeframe(event){
    var eventStart = new Date(event.start_date_time);
    var currentTime = new Date();
    if (this.timeFilter == "")
      return true;
    else if(this.timeFilter == "Today" && this.sameDay(currentTime,eventStart))
      return true;
    else if (this.timeFilter == "Tomorrow" && this.sameDay(currentTime,new Date(eventStart.getTime() + 60*60*24*1000))) // Confirm this works
      return true;
    else if (this.timeFilter == "This Week" && this.isDateWithin(currentTime.getTime(),eventStart.getTime(),60*60*24*7*1000))
      return true;
    else if (this.timeFilter == "Next Two Weeks" && this.isDateWithin(currentTime.getTime(),eventStart.getTime(),60*60*24*14*1000))
      return true;
    else if (this.timeFilter == "Past" && eventStart < currentTime)
      return true;
    else return false;
  }

  isDateWithin(today, eventDate, interval){
    return (eventDate > today && eventDate <= today + interval)
  }

  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

}
