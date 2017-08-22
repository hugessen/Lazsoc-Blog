import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { MapToIterablePipe } from '../pipes/MapToIterablePipe';
import { Router } from '@angular/router';
import * as jquery from 'jquery';
import lineClamp from 'line-clamp';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  clubs:{};
  postings:{};

  constructor(private webAPI:WebAPI, private router:Router) {
    webAPI.getClubs(true).then(res => {
      this.clubs = res;
      console.log(this.clubs);
    })
    // webAPI.getJobPostings().then(res => {
    //   this.postings = res;
    // })
  }

  ngOnInit() {

  }

  onSelect(event){
    this.router.navigate(['/clubs',event.id]);
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }


}
