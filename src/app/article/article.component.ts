import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { User } from '../models/user';
import { WebAPI } from '../services/web-api.service';
import { PublicationPipe } from '../pipes/publication.pipe';
import * as $ from "jquery";


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: { title: string, id: number, comments: any };
  isCommentActive = false;
  commentStr = "";

  constructor(public route: ActivatedRoute, public authService:AuthService, public webAPI: WebAPI) {

  }

   ngOnInit() {
     this.route.paramMap
       .switchMap((params: ParamMap) =>
         this.webAPI.getArticle(+params.get('id')))
       .subscribe((article) => {
         article.comments.sort(function(a,b) {
           return Date.parse(b.created_at) - Date.parse(a.created_at)
         })
         this.article = article;
       }); 
   }

   comment(comment){
     this.toggleCommentActive();
     this.authService.apiPost(`articles/${this.article.id}/comment`, {comment: { body: this.commentStr } } ).then(res => {
      this.article.comments.unshift(res);
    });
   }

   toggleCommentActive(){
     this.isCommentActive = !this.isCommentActive;
   }


}
