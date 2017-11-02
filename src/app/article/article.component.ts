import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { User } from '../models/user';
import { WebAPI } from '../services/web-api.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleObj:{}
  constructor(public route: ActivatedRoute, public authService:AuthService, public webAPI: WebAPI) {

  }

   ngOnInit() {
     this.route.paramMap
       .switchMap((params: ParamMap) =>
         this.webAPI.getArticle(+params.get('id')))
       .subscribe((article) => {
         this.articleObj = article;
         console.log(this.articleObj);
       }); 
   }


}
