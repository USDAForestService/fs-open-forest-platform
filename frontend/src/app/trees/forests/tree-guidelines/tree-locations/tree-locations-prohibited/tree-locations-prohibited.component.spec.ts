import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeLocationsProhibitedComponent } from './tree-locations-prohibited.component';
import { forest } from '../../../../_mocks/forest.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('TreeLocationsProhibitedComponent', () => {
  let component: TreeLocationsProhibitedComponent;
  let fixture: ComponentFixture<TreeLocationsProhibitedComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeLocationsProhibitedComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeLocationsProhibitedComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

