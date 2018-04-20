import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WebAPI } from '../services/web-api.service';
import { GetLongDate, GetTime } from '../pipes/get-long-date.pipe';
import { Event } from '../models/event';
import { Club } from '../models/club';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  public event: Event = new Event();
  public club: Club = new Club();
  public startTime: string;
  public endTime: string;
  public multiDay: boolean;
  public hasTags: boolean;

  constructor( public route: ActivatedRoute, public router: Router, public webAPI: WebAPI ) {
    this.startTime = this.getTime(this.event.start_date_time);
    console.log(new Date(this.event.start_date_time));
    this.endTime = this.getTime(this.event.end_date_time);
    this.multiDay = ((new Date(this.event.end_date_time).getDate() - new Date(this.event.start_date_time).getDate()) > 0) ? true : false;
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.webAPI.getEvent(+params.get('id')))
      .subscribe((event) => {
        this.webAPI.getClub(+event.club_id).then(res => {
          this.event = event;
          this.club = res;
          this.hasTags = this.event.event_tags.length > 0;
        })
      })
  }

  getTime(date: string): string {
    let hour = new Date(date).getUTCHours();
    let min = new Date(date).getUTCMinutes();
    let minStr = (min < 10) ? min + '0' : min;
    let ampm = (hour < 12) ? 'AM' : 'PM';
    if (hour > 12) {
      hour = hour % 12;
    }
    return (hour + ':' + minStr + ' ' + ampm);
  }

  registerForEvent() {
    // this.webAPI.registerForEvent(this.event.id).then(res => console.log(res));
  }

}
