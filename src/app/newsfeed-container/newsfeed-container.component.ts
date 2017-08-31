import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-newsfeed-container',
  templateUrl: './newsfeed-container.component.html',
  styleUrls: ['./newsfeed-container.component.css']
})
export class NewsfeedContainerComponent implements OnInit {

  tags = this.getTags();
  // @ViewChild = 

  constructor(public authService:AuthService) {

  }

  ngOnInit() {}


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
    var result = [];
    for(let tag of tags) {
      result.push({tag:tag, selected:false});
    }
    return result;
  }

  toggle(tag){
    tag.selected = !tag.selected;
    console.log("Toggle!",tag.tag);
  }


}
