import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../services/web-api.service';

@Component({
  selector: 'app-beans',
  templateUrl: './beans.component.html',
  styleUrls: ['./beans.component.css']
})
export class BeansComponent implements OnInit {
	beans:{}
  constructor(private webAPI:WebAPI) {
    webAPI.getBeans().then(res => {
      this.beans = res;
      console.log(this.beans);
    });
}

  ngOnInit() {
  }

}
