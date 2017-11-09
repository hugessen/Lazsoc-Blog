import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringContainerComponent } from './hiring-container.component';

describe('HiringContainerComponent', () => {
  let component: HiringContainerComponent;
  let fixture: ComponentFixture<HiringContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
