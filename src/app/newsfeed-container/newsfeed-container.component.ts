import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NewsfeedComponent } from '../newsfeed/newsfeed.component';
import { MapToIterablePipe } from '../pipes/map-to-iterable.pipe';

@Component({
  selector: 'app-newsfeed-container',
  templateUrl: './newsfeed-container.component.html',
  styleUrls: ['./newsfeed-container.component.css']
})
export class NewsfeedContainerComponent implements OnInit {

  @ViewChild('mainFeed') feed:NewsfeedComponent;

  tags = this.getTags();

  constructor(public authService:AuthService) {
  }

  ngOnInit() {}

  toggle(tag){
    this.tags[tag].selected = !this.tags[tag].selected;
    this.feed.updateTags(tag);
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
                "Finance",
                "Economics",
                "Social",
                "Startups",
                "Entrepreneurship",
                "Technology",
                "Philanthropy"];
                //Combine Exam Review and Academic Help into "Academics"
                
    var result = {};
    for(let tag of tags) {
      result[tag] = {selected:false};
    }
    return result;
  }

}
