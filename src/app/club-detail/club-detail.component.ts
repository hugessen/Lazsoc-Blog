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
  public state = "about";
  public fullTeam;

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
      this.fullTeam = this.getFullTeam();
  }

  getFullTeam() {
    let team = {
      portfolios: [
        {
          title: "President & Internal",
          id: "One",
          team: [
            { name: "Angelo Fousteris", title: "President", image: "assets/img/thumbnails/LazSoc.png" }, 
            { name: "Kara McDowell", title: "Internal Director", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Manpreet Brar", title: "International Ambassador", image: "assets/img/thumbnails/LazSoc.png" }
          ]
        },
        {
          title: "Marketing & Communications",
          id: "Two",
          team: [
            { name: "Rebecca Knight", title: "VP of Marketing & Communications", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Rachel Guerreiro", title: "Director", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Mahad Aamir", title: "Design Director", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Vanessa Morsink", title: "Public Relations", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Parry Rickers", title: "Social Media", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Dayna Nairn", title: "Design Manager", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Sam Weinberger", title: "Merch & Apparel", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Keerthi Ravichandran", title: "Multimedia", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Heba Hussein", title: "Photographer", image: "assets/img/thumbnails/LazSoc.png" }
          ]
        }

      ]

    }
    return team;
  }

}
