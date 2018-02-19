import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TreeCuttingRulesComponent } from './tree-cutting-rules.component';
import { forest } from '../../../../_mocks/forest.mock';

describe('TreeCuttingRulesComponent', () => {
  let component: TreeCuttingRulesComponent;
  let fixture: ComponentFixture<TreeCuttingRulesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeCuttingRulesComponent],
        schemas: [NO_ERRORS_SCHEMA]
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
