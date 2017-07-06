import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaBannerComponent } from './usa-banner.component';

describe('UsaBannerComponent', () => {
  let component: UsaBannerComponent;
  let fixture: ComponentFixture<UsaBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsaBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
