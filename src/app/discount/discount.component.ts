import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../services/web-api.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  discountPartners:any[];

  constructor(webAPI:WebAPI) {
    webAPI.getDiscountPartners()
      .then(res => this.discountPartners = res);
  }

  ngOnInit() {
  }

}
