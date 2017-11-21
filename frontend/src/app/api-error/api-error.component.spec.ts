import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiErrorComponent } from './api-error.component';

describe('ApiErrorComponent', () => {
  let component: ApiErrorComponent;
  let fixture: ComponentFixture<ApiErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
