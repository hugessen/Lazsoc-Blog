import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-beans',
  templateUrl: './beans.component.html',
  styleUrls: ['./beans.component.css']
})
export class BeansComponent implements OnInit {
	beans:{}
  constructor(private webAPI:WebAPI,private authService: AuthService,) {
}

  ngOnInit() {
  }

  getBeans(){
     this.authService.getBeans('beans/get_all.json').then(res => {
       this.beans = res;
       console.log(this.beans);
       console.log(this.beans[0].nickname,this.beans[0].lastName,this.beans[0].program);
      })
  }

}
