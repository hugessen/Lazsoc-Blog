import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../web-api.service';
import * as Stickyfill from 'stickyfill';

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

  doSticky(){
    var stickyElements = document.getElementsByClassName('sticky');
    for (var i = stickyElements.length - 1; i >= 0; i--) {
    Stickyfill.add(stickyElements[i]);
  }
  Stickyfill.add(document.getElementsByClassName('sticky-updates'));

  }

}
