import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TreeMapDetailsComponent } from './tree-map-details.component';
import { forest } from '../../..//_mocks/forest.mock';

describe('TreeMapDetailsComponent', () => {
  let component: TreeMapDetailsComponent;
  let fixture: ComponentFixture<TreeMapDetailsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeMapDetailsComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeMapDetailsComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
