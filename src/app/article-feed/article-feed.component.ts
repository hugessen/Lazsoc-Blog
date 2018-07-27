import { Component, OnInit, Input } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-article-feed',
  templateUrl: './article-feed.component.html',
  styleUrls: ['./article-feed.component.css']
})
export class ArticleFeedComponent implements OnInit {

  @Input() articles;
  user_id;

  constructor(public webAPI: WebAPI, public authService: AuthService, public router: Router) {
    this.authService.getUserAsync().then(user => this.user_id = user.id);
  }

  ngOnInit() {
  }

  viewArticle(article) {
    this.router.navigate(['/article', article.id]);
    this.scrollTop();
  }

  didUserPublish(article) {
    if (!this.authService.userSignedIn$) {
      return false;
    }
    return (this.user_id === article.author_id)
  }

  scrollTop() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }

  deleteArticle(articleID) {
    if (confirm('Are you sure you want to delete this?') == true) {
      this.authService.apiGet(`delete_article/${articleID}`).then(deletedID => {
        _.remove(this.articles, (article) => {
          return article.typeof == 'article' && article.id == deletedID;
        });
      })
    }
  }

}
