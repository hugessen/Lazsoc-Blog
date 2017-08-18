import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-composer',
  templateUrl: './article-composer.component.html',
  styleUrls: ['./article-composer.component.css']
})
export class ArticleComposerComponent implements OnInit {

  public options: Object = {
    placeholder: "Edit Me",
    toolbarButtons:['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'insertHR', 'selectAll', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo']
  }
  editorContent = "";
  editorView = true;

  constructor() { }

  ngOnInit() {
  }
}
