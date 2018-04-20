import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebAPI } from '../services/web-api.service';
import { Router } from '@angular/router';
import { NewsfeedComponent } from '../newsfeed/newsfeed.component';
import { MapToIterablePipe } from '../pipes/map-to-iterable.pipe';
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-newsfeed-container',
  templateUrl: './newsfeed-container.component.html',
  styleUrls: ['./newsfeed-container.component.css']
})
export class NewsfeedContainerComponent implements OnInit {

  @ViewChild('mainFeed') feed: NewsfeedComponent;

  tags: any = this.getTags();
  times: any = this.getTimeFilters();
  clubs: any;

  tagFilters: any[] = [];
  clubFilters: any[] = [];
  timeFilters: any[] = [];

  newsfeedState = 'events';

  constructor(public authService: AuthService, private webAPI: WebAPI) {
    webAPI.getClubs().then(res => {
      this.clubs = res;
      this.clubs.map(club => club.selected = false);
    });
  }

  ngOnInit() {
    $('.dropdown-menu').click(function(e) {
        e.stopPropagation();
    });
  }

  setNewsfeedState(state) {
    this.newsfeedState = state;
  }

  signOut() {
    this.authService.logOutUser();
    location.reload();
  }

  toggleTagFilter(tag_key) {
    const tag = this.tags[tag_key];
    if (tag.selected) {
      tag.selected = false;
      this.removeTagFilter(tag_key);
    } else if (!tag.selected) {
      tag.selected = true;
      this.addTagFilter(tag_key);
    }
  }

  toggleClubFilter(club_slug) {
    const club = this.getClubBySlug(club_slug);
    if (club.selected) {
      club.selected = false;
      this.removeClubFilter(club.slug);
    } else if (!club.selected) {
      club.selected = true;
      this.addClubFilter(club.slug);
    }
  }

  toggleTimeFilter(time_key) {
    const timeframe = this.times[time_key];
    if (timeframe.selected) {
      timeframe.selected = false;
      this.removeTimeFilter(time_key);
    } else if (!timeframe.selected) {
      timeframe.selected = true;
      this.addTimeFilter(time_key);
    }
  }

  getTags() {
    const tags = ['Competitions',
                'Networking',
                'Accounting',
                'Sports Management',
                'First Year',
                'Leadership',
                'Exam Review',
                'Public Speaking',
                'Academic Help',
                'Marketing',
                'Sales',
                'Consulting',
                'Finance',
                'Economics',
                'Social',
                'Startups',
                'Entrepreneurship',
                'Technology',
                'Philanthropy'];
                //Combine Exam Review and Academic Help into "Academics"

    const result = {};
    for (const tag of tags) {
      result[tag] = {selected: false};
    }
    return result;
  }

  getTimeFilters() {
    const filters = ['Today', 'Tomorrow', 'This Week', 'Next Two Weeks', 'Past'];
    const result = {};
    for (const timeframe of filters) {
      result[timeframe] = {selected: false};
    }
    return result;
  }

  addTagFilter(tag) {
    this.tagFilters.push(tag);
    this.feed.tagFilters.push(tag);
  }

  removeTagFilter(tag) {
    _.pull(this.tagFilters, tag);
    _.pull(this.feed.tagFilters, tag);
  }

  addClubFilter(clubSlug) {
    this.clubFilters.push(clubSlug);
    this.feed.clubFilters.push(clubSlug);
  }

  removeClubFilter(clubSlug) {
    _.pull(this.clubFilters, clubSlug);
    _.pull(this.feed.clubFilters, clubSlug);
  }

  addTimeFilter(timeframe) {
    this.timeFilters.push(timeframe);
    this.feed.timeFilter = timeframe;
  }

  removeTimeFilter(timeframe) {
    _.pull(this.timeFilters, timeframe);
    this.feed.timeFilter = '';
  }

  getClubBySlug(slug): any {
    this.clubs.find(club => club.slug === slug);
  }

}
