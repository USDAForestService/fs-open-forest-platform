import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TreeLocationsAllowedComponent } from './tree-locations-allowed.component';
import { forest } from '../../../../_mocks/forest.mock';
import { TreesService } from '../../../../_services/trees.service';
import { MockBackend } from '@angular/http/testing';

describe('TreeLocationsAllowedComponent', () => {
  let component: TreeLocationsAllowedComponent;
  let fixture: ComponentFixture<TreeLocationsAllowedComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeLocationsAllowedComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: TreesService, use: MockBackend }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeLocationsAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.forest = forest;
    expect(component).toBeTruthy();
  });

  it('should get allowed districts', () => {
    component.forest = forest;
    component.populateDistricts();
    expect(component.allowedDistricts[0].childNodes[0].id).toEqual(17);
  });

  it('should get run allowed districts on changes', () => {
    component.forest = forest;
    component.ngOnChanges();
    expect(component.allowedDistricts[0].childNodes[0].id).toEqual(17);
  });
});
