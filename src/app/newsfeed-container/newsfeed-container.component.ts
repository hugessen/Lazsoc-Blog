import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebAPI } from '../services/web-api.service';
import { NewsfeedComponent } from '../newsfeed/newsfeed.component';
import { MapToIterablePipe } from '../pipes/map-to-iterable.pipe';
import * as $ from 'jquery';

@Component({
  selector: 'app-newsfeed-container',
  templateUrl: './newsfeed-container.component.html',
  styleUrls: ['./newsfeed-container.component.css']
})
export class NewsfeedContainerComponent implements OnInit {

  @ViewChild('mainFeed') feed:NewsfeedComponent;

  tags = this.getTags();
  public clubs:any;
  private filters:any[]

  constructor(public authService:AuthService, private webAPI: WebAPI) {
    this.clubs = webAPI.getClubs(true).then(res => {
      this.clubs = res;
      this.clubs.map(function(club) {
        club.selected = false;
      })
      console.log(this.clubs);
    });
  }

  ngOnInit() {
    $('.dropdown-menu').click(function(e) {
        e.stopPropagation();
    });
  }

  toggleTagFilter(tag_key){
    let tag = this.tags[tag_key];
    if (tag.selected){
      tag.selected = false;
      this.feed.removeTagFilter(tag_key);
    }
    else if (!tag.selected){
      tag.selected = true;
      this.feed.addTagFilter(tag_key);
    }
  }

  toggleClubFilter(club_id){
    let club = this.clubs[club_id];
    if (club.selected){
      club.selected = false;
      this.feed.removeClubFilter(club.slug.toUpperCase());
    }
    else if (!club.selected){
      club.selected = true;
      this.feed.addClubFilter(club.slug.toUpperCase());
    }
  }

  getTags(){
    let tags = ["Competitions",
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
                "Finance",
                "Economics",
                "Social",
                "Startups",
                "Entrepreneurship",
                "Technology",
                "Philanthropy"];
                //Combine Exam Review and Academic Help into "Academics"

    let result = {};
    for(let tag of tags) {
      result[tag] = {selected:false};
    }
    return result;
  }

}
