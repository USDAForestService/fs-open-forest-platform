import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationNoncommercialGroupComponent } from './application-noncommercial-group.component';

describe('ApplicationNoncommercialGroupComponent', () => {
  let component: ApplicationNoncommercialGroupComponent;
  let fixture: ComponentFixture<ApplicationNoncommercialGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationNoncommercialGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationNoncommercialGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
