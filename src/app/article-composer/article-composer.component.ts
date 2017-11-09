import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-composer',
  templateUrl: './article-composer.component.html',
  styleUrls: ['./article-composer.component.css']
})
export class ArticleComposerComponent implements OnInit {

  public options: Object = {
    placeholder: "Edit Me",
    toolbarButtons:['bold', 'italic', 'underline', 'fontFamily', 'fontSize', '|', 'formatOL', 'formatUL', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'insertHR', 'selectAll', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
    fontSize: ['2.5','8', '10', '12', '14', '18', '30', '60', '96']
  }

  editorContent = "";
  editorView = true;
  article:{} 
  articles = []
  title:string = ""
  constructor(public authService: AuthService, private router: Router) { 
  //  this.getArticles()
  }

  ngOnInit() {
  }

  submit(){
    this.article = {
      title: this.title,
      body: this.editorContent
    }
    this.authService.apiPost('post_article', this.article).then(res => {
      console.log("line 34")
      console.log(res)
      this.router.navigate(['./newsfeed']);
    });
  }

 /* getArticles(){
    this.authService.apiGet('get_articles.json').then(res => {
       this.articles = res;
    });
  } */
}
