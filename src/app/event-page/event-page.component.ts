import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WebAPI } from '../services/web-api.service';
import { GetLongDate } from '../pipes/get-long-date.pipe';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  event = {};
  club = {};
  constructor( private route: ActivatedRoute, private router: Router, private webAPI: WebAPI ) {

  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.webAPI.getEvent(+params.get('id')))
      .subscribe((event) => {
        this.webAPI.getClub(+event.club_id).then(res => {
          this.event = event;
          this.club = res;
        })
      })
  }

}
