import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector:'laz-navbar',
  templateUrl:'laz-navbar.html',
  styleUrls: ['./laz-navbar.css']
})
export class LazNavbar {
  constructor(private router:Router, private authService:AuthService){

  };

  signOut(){
    this.authService.logOutUser();
    location.reload();
  }

  getUser() {
    if(this.authService.userSignedIn$){
      return this.authService.authService.currentUserData;
    }
    else return null;
  }

}
