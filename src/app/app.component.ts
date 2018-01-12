import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery'; window["$"] = $; window["jQuery"] = $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  url:any = {url:""};
  isUpdate = false;
  constructor(public authService:AuthService, private router:Router){
    router.events.subscribe((url) => {
      this.url = url;
    });
  }

}
