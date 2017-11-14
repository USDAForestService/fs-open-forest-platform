import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCuttingComponent } from './tree-cutting.component';

describe('TreeCuttingComponent', () => {
  let component: TreeCuttingComponent;
  let fixture: ComponentFixture<TreeCuttingComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeCuttingComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
