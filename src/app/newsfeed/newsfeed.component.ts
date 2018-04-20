import { Component, OnInit, Input } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { Observable } from 'rxjs/Rx';
import { GetLongDate } from '../pipes/get-long-date.pipe';
import { Event } from '../event';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PublicationPipe } from '../pipes/publication.pipe';
import * as Stickyfill from 'stickyfill';
import * as _ from 'lodash';

const ONE_DAY = 60 * 60 * 24 * 1000;

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  events: any;
  clubs = {};
  hasEvents = true;
  tagFilters = [];
  clubFilters = [];
  timeFilter = '';

  @Input() clubID;

  constructor(public router: Router, public webAPI: WebAPI, public authService: AuthService) {
  }

  ngOnInit() {
    Observable.forkJoin([
      Observable.fromPromise(this.webAPI.getNewsfeed(this.clubID)),
      Observable.fromPromise(this.webAPI.getClubs())
    ]).subscribe(data => {
      [this.events, this.clubs] = data;
      this.hasEvents = this.checkHasEvents();
    })
  }

  vote(event) {
    this.authService.apiPost('articles/' + event.id + '/vote', null).then(res => {
      console.log(res)
    });
  }

  viewEvent(event) {
    this.router.navigate(['/events', event.id]);
    this.scrollTop();
  }

  scrollTop() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }

  doSticky() {
    const stickyElements = document.getElementsByClassName('sticky');
    for (let i = stickyElements.length - 1; i >= 0; i--) {
      Stickyfill.add(stickyElements[i]);
    }
    Stickyfill.add(document.getElementsByClassName('sticky-updates'));
  }

  checkHasEvents(): boolean {
    if (this.clubID !== 0) {
      for (let event of this.events){
        if (event.club_id === this.clubID) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  }

  addTagFilter(tag) {
    this.tagFilters.push(tag);
  }

  removeTagFilter(tag) {
    _.pull(this.tagFilters, tag);
  }

  addClubFilter(clubSlug) {
    this.clubFilters.push(clubSlug);
  }

  removeClubFilter(clubSlug) {
    _.pull(this.clubFilters, clubSlug);
  }

  addTimeFilter(timeframe) {
    this.timeFilter.push(timeframe);
  }

  removeTimeFilter(timeframe) {
    _.pull(this.timeFilter, timeframe);
  }

  isVisible(event) {
    if (this.clubID !== 0 && this.clubID !== event.club_id) {
      return false
    }
    return this.matchesFilters(event);
  }

  matchesFilters(event) {
      return (this.matchesTags(event) && this.matchesClub(event) && this.matchesTimeframe(event));
  }

  matchesTags(event) {
    if (this.tagFilters.length > 0) {
      for(let tag of event.event_tags){
        if (_.indexOf(this.tagFilters, tag.tag) !== -1) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  matchesClub(event) {
    const slug = this.clubs[event.club_id].slug;
    return this.clubFilters.length === 0 || _.indexOf(this.clubFilters, slug) !== -1;
  }

  matchesTimeframe(event) {
    const eventStart = new Date(event.start_date_time);
    const currentTime = new Date();
    if (this.timeFilter === '') {
      return true;
    }
    if (this.timeFilter === 'Today' && this.sameDay(currentTime, eventStart)) {
      return true;
    }
    if (this.timeFilter === 'Tomorrow' && this.sameDay(currentTime, new Date(eventStart.getTime() + ONE_DAY))) { // Confirm this works
      return true;
    }
    if (this.timeFilter === 'This Week' && this.isDateWithin(currentTime.getTime(), eventStart.getTime(), ONE_DAY * 7)) {
      return true;
    }
    if (this.timeFilter === 'Next Two Weeks' && this.isDateWithin(currentTime.getTime(), eventStart.getTime(), ONE_DAY * 14)) {
      return true;
    }
    if (this.timeFilter === 'Past' && eventStart < currentTime) {
      return true;
    }
    return false;
  }

  isDateWithin(today, eventDate, interval) {
    return (eventDate > today && eventDate <= today + interval)
  }

  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

}
