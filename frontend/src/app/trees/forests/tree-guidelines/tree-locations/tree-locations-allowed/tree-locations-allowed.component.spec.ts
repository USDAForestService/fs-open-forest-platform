import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeLocationsAllowedComponent } from './tree-locations-allowed.component';
import { forest } from '../../../../_mocks/forest';

describe('TreeLocationsAllowedComponent', () => {
  let component: TreeLocationsAllowedComponent;
  let fixture: ComponentFixture<TreeLocationsAllowedComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeLocationsAllowedComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeLocationsAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
