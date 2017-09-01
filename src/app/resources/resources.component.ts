import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  documents = this.getDocuments();
  selectedDoc;

  constructor() {
    this.selectedDoc = 0;
  }

  ngOnInit() {
  }

  getDocuments(){
    var result = [
      {name:"Lazsoc constitution", path: "Lazaridis-Students-Society-Constitution.pdf"},
      {name:"Lazsoc Elections Policy 17/18", path: "LazSoc-Elections-Policy_17-18"},
      {name:"Financial Policy", path: "Financial Policy.pdf"}
    ]
    return result;
  }
  selectDoc(doc){
    this.selectedDoc = doc;
  }

}
