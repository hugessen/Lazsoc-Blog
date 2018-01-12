import { Component, OnInit, Input } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'hiring-feed',
  templateUrl: './hiring.component.html',
  styleUrls: ['./hiring.component.css']
})
export class HiringComponent implements OnInit {
  jobPostings;
  public clubs;

  @Input() clubID;
  constructor(public webAPI: WebAPI, public router:Router) {
    Observable.forkJoin([
      Observable.fromPromise(webAPI.getJobPostings()),
      Observable.fromPromise(webAPI.getClubs())
    ]).subscribe(data => {
      [this.jobPostings, this.clubs] = data;
    })
  }

  ngOnInit() {
  }

  onSelect(jobPosting){
    this.router.navigate(['/hiring',jobPosting.id]);
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }
}
