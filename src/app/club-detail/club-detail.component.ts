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
  public newsfeed;
  public state = 'events';
  public fullTeam;

  constructor(public route: ActivatedRoute, public router: Router, public webAPI: WebAPI) { }

  ngOnInit() {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) =>
    //     this.webAPI.getClub(+params.get('id')))
    //       .subscribe((club) => {
    //         this.club = club
    //       });
    this.route.data
      .subscribe((data: { club: any }) => {
        console.log(data);
        this.club = data.club;
      });
    this.fullTeam = this.getFullTeam();
  }

  getFullTeam() {
    const team = {
      portfolios: [
        {
          title: 'President & Internal',
          team: [
            { name: 'Angelo Fousteris', title: 'President', image: 'assets/img/Head Shots/Angelo1.jpg' },
            { name: 'Kara McDowell', title: 'Internal Director', image: 'assets/img/Head Shots/Kara1.jpg' },
            { name: 'Manpreet Brar', title: 'International Ambassador', image: 'assets/img/Head Shots/Manpreet.jpg' }
          ]
        },
        {
          title: 'Marketing & Communications',
          team: [
            { name: 'Rebecca Knight', title: 'VP of Marketing & Communications', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'Rachel Guerreiro', title: 'Director', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'Mahad Aamir', title: 'Design Director', image: 'assets/img/Head Shots/Mahad.jpg' },
            { name: 'Vanessa Morsink', title: 'Public Relations', image: 'assets/img/Head Shots/Vanessa.jpg' },
            { name: 'Parry Rickers', title: 'Social Media', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'Dayna Nairn', title: 'Design Manager', image: 'assets/img/Head Shots/Dayna.jpg' },
            { name: 'Sam Weinberger', title: 'Merch & Apparel', image: 'assets/img/Head Shots/SamW.jpg' },
            { name: 'Keerthi Ravichandran', title: 'Multimedia', image: 'assets/img/Head Shots/Keerthi.jpg' },
            { name: 'Heba Hussein', title: 'Photographer', image: 'assets/img/Head Shots/Heba.jpg' }
          ]
        },
        {
          title: 'Corporate Relations',
          team: [
            { name: 'Michelle Stratulat', title: 'VP of Corporate Relations', image: 'assets/img/Head Shots/MichelleS.jpg' },
            { name: 'Madison MacLeod', title: 'Manager-Internal', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'Justin Dube', title: 'Manager-Internal', image: 'assets/img/Head Shots/JustinD.jpg' },
            { name: 'Xavier Prosper', title: 'Manager-Internal', image: 'assets/img/Head Shots/Xavier.jpg' },
            { name: 'Jack Heinzl', title: 'Manager-Internal', image: 'assets/img/Head Shots/JackH.jpg' },
            { name: 'Caleb Larrier', title: 'Manager-Internal', image: 'assets/img/Head Shots/Caleb.jpg' },
            { name: 'Hannah Klein', title: 'Discount Specialist', image: 'assets/img/Head Shots/Hannah.jpg' },
            { name: 'Justin Sung', title: 'C & C Outreach', image: 'assets/img/Head Shots/JustinS.jpg' }
          ]
        },
        {
          title: 'Finance',
          team: [
            { name: 'Raluca Truta', title: 'VP of Finance', image: 'assets/img/Head Shots/Raluca.jpg' },
            { name: 'Diane Oliver', title: 'Internal Director', image: 'assets/img/Head Shots/Diane.jpg' },
            { name: 'Soo-Ah Youn', title: 'Internal Director', image: 'assets/img/Head Shots/Soo-ah.jpg' },
            { name: 'Shruti Uppal', title: 'Internal Director', image: 'assets/img/Head Shots/Shruti.jpg' },
            { name: 'Jacob Krohnert', title: 'Internal Director', image: 'assets/img/Head Shots/JacobK.jpg' },
            { name: 'Jack Fischer', title: 'Director of C & C', image: 'assets/img/Head Shots/JackF.jpg' },
            { name: 'Sam Hall', title: 'Financial Assistant', image: 'assets/img/Head Shots/SamH.jpg' }
          ]
        },
        {
          title: 'Clubs & Associations',
          team: [
            { name: 'Emily Fraser', title: 'VP of Clubs & Associations', image: 'assets/img/Head Shots/Emily1.jpg' },
            { name: 'Yohan Billmoria', title: 'Club Specialist', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'James Varley', title: 'Club Specialist', image: 'assets/img/Head Shots/JamieV.jpg' },
            { name: 'Theo Will-Dryden', title: 'Director of Philanthrophy', image: 'assets/img/Head Shots/Theo.jpg' },
            { name: 'Sarah Arnott', title: 'Philanthrophy Manager', image: 'assets/img/Head Shots/Sara1.jpg' },
            { name: 'Kristen Marshall', title: 'Philanthrophy Manager', image: 'assets/img/Head Shots/Kristen2.jpg' }
          ]
        },
        {
          title: 'Student Engagement',
          team: [
            { name: 'Marnie McCormac', title: 'VP of Student Engagement', image: 'assets/img/Head Shots/Marnie.jpg' },
            { name: 'Olivia Bowe', title: 'Director of Social Events', image: 'assets/img/Head Shots/OliviaB.jpg' },
            { name: 'Alena Guits', title: 'Director of Academic Events', image: 'assets/img/Head Shots/Alena.jpg' },
            { name: 'Rebecca Lay', title: 'Events Manager', image: 'assets/img/Head Shots/Rebecca.jpg' },
            { name: 'Dakota Van Halteren', title: 'Events Manager', image: 'assets/img/Head Shots/Dakota.jpg' }
          ]
        },
        {
          title: 'Technology Development',
          team: [
            { name: 'Richard Hugessen', title: 'VP of Technology Development', image: 'assets/img/Head Shots/Richard.jpg' },
            { name: 'Riyaz Shaikh', title: 'Web Developer', image: 'assets/img/Head Shots/Riyaz.jpg' },
            { name: 'Owen Van Valkenberg', title: 'Mobile App Developer', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'Hamzah Zia', title: 'Web Developer', image: 'assets/img/thumbnails/LazSoc.png' }
          ]
        },
        {
          title: 'First Year Representatives',
          team: [
            { name: 'Gabriela Morales', title: 'First Year Rep', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'Adam Wali', title: 'First Year Rep', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'Hayden Carver', title: 'First Year Rep', image: 'assets/img/thumbnails/LazSoc.png' },
            { name: 'Ian Fraser', title: 'First Year Rep', image: 'assets/img/thumbnails/LazSoc.png' }
          ]
        }
      ]
    }
    return team;
  }

}
