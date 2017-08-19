import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailPageComponent } from './job-detail-page.component';

describe('JobDetailPageComponent', () => {
  let component: JobDetailPageComponent;
  let fixture: ComponentFixture<JobDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
