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

  public club;
  public clubEvents;
  public newsfeed;
  public state = 'events';
  public fullTeam;

  constructor(public route: ActivatedRoute, public router: Router, public webAPI: WebAPI) {
    // this.webAPI.getEventsByClub(2).then(res => console.log("events by club: ", res));
  }

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.club = data.clubAndEvents['club'];
        this.clubEvents = data.clubAndEvents['clubEvents'];
      });
    this.fullTeam = this.getFullTeam();
  }

  getFullTeam() {
    const team = {
      portfolios: [
        {
          title: 'President',
          team: [
            { name: 'Emily Fraser', title: 'President', image: 'assets/img/Head Shots/Emily F.jpg' }
          ]
        },
        {
          title: 'Internal',
          team: [
            { name: 'Kara McDowell', title: 'VP of Internal', image: 'assets/img/Head Shots/Kara.jpg' },
            { name: 'Gabriela Morales', title: 'Executive', image: 'assets/img/Head Shots/Gaby.jpg' }
            { name: 'Hayley McGoldrick', title: 'Lazaridis Review Editor-in-Chief', image: 'assets/img/Head Shots/Hayley M.jpg' }
            { name: 'Tyler De Sousa', title: 'Director of Philanthropy', image: 'assets/img/Head Shots/Tyler.jpg' }
          ]
        },
        {
          title: 'Marketing & Communications',
          team: [
            { name: 'Mahad Aamir', title: 'VP of Marketing', image: 'assets/img/Head Shots/Mahad A.jpg' },
            { name: 'Shivansh Patel', title: 'Director of Marketing', image: 'assets/img/Head Shots/Shivansh.jpg' },
            { name: 'Alex Martin', title: 'Multimedia Manager', image: 'assets/img/Head Shots/Alex M.jpg' },
            { name: 'Grayson Hunter', title: 'Marketing Manager', image: 'assets/img/Head Shots/Grayson.jpg' },
            { name: 'Julia Christopherakos', title: 'Brand Manager', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'Maddy Rotman', title: 'Design Director', image: 'assets/img/Head Shots/Maddy.jpg' }
          ]
        },
        {
          title: 'Corporate Relations',
          team: [
            { name: 'Hannah Dube', title: 'VP of Corporate', image: 'assets/img/Head Shots/Hannah B.jpg' },
            { name: 'Ashhad Kabeer', title: 'Director of Sponsorships', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'Joseph Tung', title: 'Director of Alumni Relations', image: 'assets/img/Head Shots/Joseph.jpg' }
          ]
        },
        {
          title: 'Finance',
          team: [
            { name: 'Sam Hall', title: 'VP of Finance', image: 'assets/img/Head Shots/Sam.jpg' },
            { name: 'Hayden Carver', title: 'External Director of Finance', image: 'assets/img/Head Shots/Hayden.jpg' },            
            { name: 'Jackson Relouw', title: 'External Director of Finance', image: 'assets/img/Head Shots/Jackson.jpg' }            
            { name: "Alex O'Hara", title: 'External Director of Finance', image: 'assets/img/Head Shots/Alex O.jpg' },            
          ]
        },
        {
          title: 'Clubs & Associations',
          team: [
            { name: 'Dayna Nairn', title: 'VP of Clubs', image: 'assets/img/Head Shots/Dayna N.jpg' },
            { name: 'Adam Wali', title: 'Director of Club Strategy', image: 'assets/img/Head Shots/Adam.jpg' }
            ]
        },
        {
          title: 'Events',
          team: [
            { name: 'Alex Watson', title: 'VP of Events', image: 'assets/img/Head Shots/Alex.jpg' },
            { name: 'Blair Forrest', title: 'Director of Case & Competitions', image: 'assets/img/Head Shots/Blair.jpg' },
            { name: 'Jenna Greenspoon', title: 'Events Manager', image: 'assets/img/Head Shots/Jenna G.jpg' }
            { name: 'Samia Sami', title: 'Events Manager', image: 'assets/img/thumbnails/LazSoc.png' }
            ]
        },
        {
          title: 'Technology Development',
          team: [
            { name: 'Richard Hugessen', title: 'VP of Technology Development', image: 'assets/img/Head Shots/Rich.jpg' },
            { name: 'Harsh Joshi', title: 'Web Developer', image: 'assets/img/Head Shots/Harsh.jpg' },
            { name: 'Natasha Kasunic', title: 'Web Developer', image: 'assets/img/Head Shots/Natasha.jpg' }
            ]
        },
        {
          title: 'First Year Representatives',
          team: [
          ]
        }
      ]
    }
    return team;
  }

}
