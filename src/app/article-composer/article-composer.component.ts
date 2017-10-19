import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }
}
