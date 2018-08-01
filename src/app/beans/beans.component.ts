import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-beans',
  templateUrl: './beans.component.html',
  styleUrls: ['./beans.component.css']
})
export class BeansComponent implements OnInit {
	beans;

  constructor( public authService: AuthService, public route: ActivatedRoute ) {}

  ngOnInit() {
    this.route.data.subscribe(data => { this.beans = data.beans; console.log(this.beans); });
  }

}
