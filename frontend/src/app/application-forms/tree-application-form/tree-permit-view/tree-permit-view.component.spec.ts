import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreePermitViewComponent } from './tree-permit-view.component';

describe('TreePermitViewComponent', () => {
  let component: TreePermitViewComponent;
  let fixture: ComponentFixture<TreePermitViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreePermitViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreePermitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
