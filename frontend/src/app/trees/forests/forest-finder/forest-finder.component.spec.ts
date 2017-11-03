import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestFinderComponent } from './forest-finder.component';

describe('ForestFinderComponent', () => {
  let component: ForestFinderComponent;
  let fixture: ComponentFixture<ForestFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForestFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
