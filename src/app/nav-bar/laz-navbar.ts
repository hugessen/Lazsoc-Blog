import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector:'laz-navbar',
  templateUrl:'laz-navbar.html'
})
export class LazNavbar {
  constructor(private router:Router){

  };

  goto(route:String){
    this.router.navigate([route]);
  }

}
