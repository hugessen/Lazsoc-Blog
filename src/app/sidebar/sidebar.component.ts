import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../services/web-api.service';

@Component({
  selector: 'sidebar-right',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  events = [];
  constructor(private webAPI:WebAPI) {
    this.webAPI.getBlogContent().then(res => {
      this.events = res;
    })
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'profile-sidebar',
  templateUrl: './profile-sidebar.html',
  styleUrls: ['./sidebar.component.css']
})
export class ProfileSidebar implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
