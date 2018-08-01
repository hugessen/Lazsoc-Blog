import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../services/web-api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
	activeCol = 'beans';
	carouselEvents;
  constructor(public webAPI: WebAPI) {
  	console.log("yeah");
  	this.webAPI.getHomepageEvents().then(res => {
  		console.log("Carousel events", res);
  		this.carouselEvents = res;
  	})
  }

  ngOnInit() {
  }

}
