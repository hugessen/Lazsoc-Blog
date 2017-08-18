import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector:'laz-navbar',
  templateUrl:'laz-navbar.html',
  styleUrls: ['./laz-navbar.css']
})
export class LazNavbar {
  constructor(private router:Router){

  };

}
