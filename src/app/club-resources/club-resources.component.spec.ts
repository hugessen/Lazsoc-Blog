import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubResourcesComponent } from './club-resources.component';

describe('ClubResourcesComponent', () => {
  let component: ClubResourcesComponent;
  let fixture: ComponentFixture<ClubResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
