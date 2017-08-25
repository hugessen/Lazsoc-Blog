import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedContainerComponent } from './newsfeed-container.component';

describe('NewsfeedContainerComponent', () => {
  let component: NewsfeedContainerComponent;
  let fixture: ComponentFixture<NewsfeedContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
