import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../pipes/safe.pipe';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resourceType = "discountProgram";
  selectedDoc = 0;
  studentResources:any[];
  officialDocs:any[];

  constructor() {
  }

  ngOnInit() {
    this.setDocuments();
  }

  setDocuments(){
    this.studentResources = [
      {name:"Clubs Guide", path: "Clubs Guide.pdf"},
      {name:"Core Values", path: "Core Values.pdf"},
    ],
    this.officialDocs = [
      {name:"Lazsoc Constitution", path: "Lazaridis-Students-Society-Constitution.pdf"},
      {name:"Lazsoc Elections Policy 17/18", path: "LazSoc-Elections-Policy_17-18.pdf"},
      {name:"Financial Policy", path: "Financial Policy.pdf"}
    ]
  }

  selectDoc(doc){
    this.selectedDoc = doc;
  }

}
