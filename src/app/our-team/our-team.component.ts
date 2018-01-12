import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WebAPI } from '../services/web-api.service';
import { Club } from '../models/club';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent implements OnInit {

	public club: Club = new Club();
	public newsfeed;
	public state = "team";

	constructor(public route: ActivatedRoute, public router: Router, public webAPI: WebAPI) { }

	ngOnInit() {
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.webAPI.getClub(2))
			.subscribe((club) => {
				this.webAPI.getNewsfeed(club).then(res => {
					this.club = club;
					this.newsfeed = res;
				})


			});
	}

}
