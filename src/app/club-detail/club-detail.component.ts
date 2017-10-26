import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WebAPI } from '../services/web-api.service';
import { Club } from '../models/club';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {

  public club:Club = new Club();
  public newsfeed;
  public state = "events";

  constructor(public route: ActivatedRoute, public router: Router, public webAPI: WebAPI) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.webAPI.getClub(+params.get('id')))
      .subscribe((club) => {
        this.webAPI.getNewsfeed(club).then(res => {
          this.club = club;
          this.newsfeed = res;
          console.log("Newsfeed",this.newsfeed);
        })


      } );
  }

}
