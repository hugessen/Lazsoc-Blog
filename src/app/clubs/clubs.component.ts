import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../web-api.service';
import * as jquery from 'jquery';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  clubs = {};

  constructor(private webAPI:WebAPI) {
    webAPI.getClubs(true).then(res => {
      this.clubs = res;
    })
  }

  ngOnInit() {

  }

}
