import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLandingComponent } from './main-landing.component';

describe('MainLandingComponent', () => {
  let component: MainLandingComponent;
  let fixture: ComponentFixture<MainLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
