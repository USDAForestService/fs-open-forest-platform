import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationNoncommercialGroupComponent } from './application-noncommercial-group.component';

import { FormsModule } from '@angular/forms';

describe('ApplicationNoncommercialGroupComponent', () => {
  let component: ApplicationNoncommercialGroupComponent;
  let fixture: ComponentFixture<ApplicationNoncommercialGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationNoncommercialGroupComponent ],
      imports: [ FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationNoncommercialGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
