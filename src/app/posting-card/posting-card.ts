import { Component } from '@angular/core';

@Component({
  selector:'posting-card',
  templateUrl:'posting-card.html',
  styleUrls:['posting-card.css']
})
export class PostingCard {
 postings: Posting[] = [{
   title:"First Year Rep",
   subtitle:"A great way to get involved!",
   club: "The Advertising Project",
   banner:"../../assets/img/TAP.png"
 },
 {
   title:"Conference Delegate",
   subtitle:"Improve your case competition skills!",
   club: "DECA Laurier",
   banner:"../../assets/img/DECA.png"
 },
 {
   title:"Conference Delegate",
   subtitle:"Improve your case competition skills!",
   club: "DECA Laurier",
   banner:"../../assets/img/LEC.png"
 }
]
}

class Posting {
  title: string;
  subtitle:string;
  club:string;
  banner:string;
}
