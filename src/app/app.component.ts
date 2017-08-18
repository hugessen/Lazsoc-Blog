import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fullScreen = false;
  title = 'app';
  pathStr:string;
  fullScrPaths = ["/compose"];
  constructor(r:Router){
    // r.events.subscribe((url:any) => {
    //   this.pathStr = url.url;
    //   this.fullScreen = this.isFullScreen(url.url);
    //   console.log(this.fullScreen);
    // });
  }

  isFullScreen(url){
    for(let path of this.fullScrPaths) {
      if (url === path)
        return true;
    }
    return false;
  }
}
