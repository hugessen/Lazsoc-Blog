import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../web-api.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  events = [];
  constructor(private webAPI: WebAPI) {
    webAPI.getEvents().then( res => {
      this.events = res.events;
      console.log(this.events);
    })
  }

  ngOnInit() {
  }

}
