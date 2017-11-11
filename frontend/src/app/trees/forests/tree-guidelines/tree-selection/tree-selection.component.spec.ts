import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSelectionComponent } from './tree-selection.component';

describe('TreeSelectionComponent', () => {
  let component: TreeSelectionComponent;
  let fixture: ComponentFixture<TreeSelectionComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeSelectionComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
