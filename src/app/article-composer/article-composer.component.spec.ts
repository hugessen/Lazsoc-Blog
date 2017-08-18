import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComposerComponent } from './article-composer.component';

describe('ArticleComposerComponent', () => {
  let component: ArticleComposerComponent;
  let fixture: ComponentFixture<ArticleComposerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleComposerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
