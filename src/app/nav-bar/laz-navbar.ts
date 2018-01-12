import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
// import * as jquery from 'jquery';

@Component({
  selector:'laz-navbar',
  templateUrl:'laz-navbar.html',
  styleUrls: ['./laz-navbar.css']
})
export class LazNavbar implements OnInit {
  state = "login";
  modalActions = new EventEmitter<string>();
  url:any = {url:""};

  constructor(public router:Router, public authService:AuthService){
    router.events.subscribe((url) => {
      this.url = url;
    });
  };

  ngOnInit() {

  }

  isUpdate(){
    return this.url.url == "/update";
  }

}
