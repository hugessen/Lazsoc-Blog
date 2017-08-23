import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WebAPI } from '../services/web-api.service';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {

  private club ={};

  constructor(private route: ActivatedRoute, private router: Router, private webAPI: WebAPI) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.webAPI.getClub(+params.get('id')))
      .subscribe((club) => this.club = club);
  }

}
