import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { User } from '../models/user';
import { WebAPI } from '../services/web-api.service';
import { PublicationPipe } from '../pipes/publication.pipe';
import * as _ from "lodash";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: { title: string, id: number, comments: any, body:any, votes_for:any[], userVoted:any, cover_url:string };
  isCommentActive = false;
  userVoted = null;
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

   didUserPublish(publishable) {
     if (!this.authService.userSignedIn$)
       return false
     return this.authService.currentUser.id == publishable.user_id;
   }

   didUserUpvote(){
     if (this.userVoted != null) return this.userVoted;
     if (!this.authService.userSignedIn$) return false;
     return this.article.votes_for.findIndex(vote => vote.voter_id == this.authService.currentUser.id) != -1;
   }

   deleteComment(comment) {
     this.authService.apiGet(`articles/${comment.id}/delete_comment`).then(deletedID => {
       console.log(deletedID);
       _.remove(this.article.comments, function(currComment) { return currComment.id == deletedID });
     })
   }

   deleteArticle(){
     this.authService.apiGet(`articles/${this.article.id}/delete_article`).then(deletedID => {
       console.log("Deleted");
     })
   }

   toggleCommentActive(){
     this.isCommentActive = !this.isCommentActive;
   }

  like() {
    this.authService.apiGet(`articles/${this.article.id}/vote`).then(res => {
      if (this.userVoted == null)
        this.userVoted = !this.didUserUpvote();
      else
        this.userVoted = !this.userVoted;
      console.log(res);
    })
  }

}
