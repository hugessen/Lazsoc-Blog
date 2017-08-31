import { Component, OnInit, Input } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { Observable } from 'rxjs/Rx';
import { GetLongDate } from '../pipes/get-long-date.pipe';
import { Event } from '../event';
import { Router } from '@angular/router';
import * as Stickyfill from 'stickyfill';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  events:any;
  clubs = {};
  newsfeedState = "all";
  content = [];
  hasEvents:boolean = true;
  tags = this.getTags();
  filtersApplied = true;

  @Input() clubID;

  constructor(public router: Router, public webAPI: WebAPI) {
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

  updateTags(tag){
    this.tags[tag].selected = !this.tags[tag].selected;
    console.log(this.tags);
  }

  getTags(){
    var tags = ["Competitions",
                "Networking",
                "Accounting",
                "Sports Management",
                "First Year",
                "Leadership",
                "Exam Review",
                "Public Speaking",
                "Academic Help",
                "Marketing",
                "Sales",
                "Consulting",
                "Journalism and Media",
                "Debate",
                "Finance",
                "Economics",
                "Social",
                "Startups",
                "Entrepreneurship",
                "Technology",
                "Philanthropy"];
    var result = {};
    for(let tag of tags) {
      result[tag] = {selected:false};
    }
    return result;
  }

  matchesTags(event){
    for(let tag of event.event_tags){
      // console.log(tag);
      if(this.tags[tag.tag].selected)
        return true
    }
    return false;
  }

}
