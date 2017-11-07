import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCuttingCleanupComponent } from './tree-cutting-cleanup.component';
import { forest } from '../../../../_mocks/forest';

describe('TreeCuttingCleanupComponent', () => {
  let component: TreeCuttingCleanupComponent;
  let fixture: ComponentFixture<TreeCuttingCleanupComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeCuttingCleanupComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCuttingCleanupComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
