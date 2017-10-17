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
        },
        {
          title: "Corporate Relations",
          id: "Three",
          team: [
            { name: "Michelle Stratulat", title: "VP of Corporate Relations", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Madison MacLead", title: "Manager-Internal", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Justin Dube", title: "Manager-Internal", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Xavier Prosper", title: "Manager-Internal", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Jack Heinzl", title: "Manager-Internal", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Hannah Klien", title: "Specialistr", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Justin Sung", title: "C & C Outreach", image: "assets/img/thumbnails/LazSoc.png" }
          ]
        },
        {
          title: "Finance",
          id: "Four",
          team: [
            { name: "Raluca Truta", title: "VP of Finance", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Diane Oliver", title: "Internal Director", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Soo-Ah Youn", title: "Internal Director", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Shruti Uppal", title: "Internal Director", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Jacob Krohnert", title: "Internal Director", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Jack Fischer", title: "Director of C & C", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Sam Hall", title: "Financial Assistant", image: "assets/img/thumbnails/LazSoc.png" } 
          ]
        },
        {
          title: "Clubs & Associations",
          id: "Five",
          team: [
            { name: "Emily Fraser", title: "VP of Clubs & Associations", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Yohan Billmoria", title: "Club Specialist", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "James Varley", title: "Club Specialist", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Theo Will-Dryden", title: "Director of Philanthrophy", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Sarah Arnott", title: "Philanthrophy Manager", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Kristen Marshall", title: "Philanthrophy Manager", image: "assets/img/thumbnails/LazSoc.png" }
          ]
        },
        {
          title: "Student Engagement",
          id: "Six",
          team: [
            { name: "Marnie McCormac", title: "VP of Student Engagement", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Yohan Billmoria", title: "Director of Social Events", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "James Varley", title: "Director of Academic Events", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Theo Will-Dryden", title: "Events Manager", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Sarah Arnott", title: "Events Manager", image: "assets/img/thumbnails/LazSoc.png" }
          ] 
        },
        {
          title: "Technology Development",
          id: "Five",
          team: [
            { name: "Richard Hugessen", title: "VP of Technology Development", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Riyaz Shaikh", title: "Web Developer", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Owen Van Valkenberg", title: "Mobile App Developer", image: "assets/img/thumbnails/LazSoc.png" },
            { name: "Hamzah Zia", title: "Web Developer", image: "assets/img/thumbnails/LazSoc.png" },
          ]
        }
      ]

    }
    return team;
  }

}
