import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCuttingRulesComponent } from './tree-cutting-rules.component';
import { forest } from '../../../../_mocks/forest.mock';

describe('TreeCuttingRulesComponent', () => {
  let component: TreeCuttingRulesComponent;
  let fixture: ComponentFixture<TreeCuttingRulesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeCuttingRulesComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCuttingRulesComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
