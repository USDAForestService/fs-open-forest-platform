import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitApplicationViewComponent } from './permit-application-view.component';

describe('PermitApplicationViewComponent', () => {
  let component: PermitApplicationViewComponent;
  let fixture: ComponentFixture<PermitApplicationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitApplicationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitApplicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
