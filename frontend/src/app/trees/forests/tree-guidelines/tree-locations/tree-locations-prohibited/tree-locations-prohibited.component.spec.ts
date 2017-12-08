import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';

import { TreeLocationsProhibitedComponent } from './tree-locations-prohibited.component';
import { FilterPipe } from '../../../../../_pipes/filter.pipe';
import { forest } from '../../../../_mocks/forest.mock';
import * as sinon from 'sinon';
import { TreeDistrictsUtilService } from '../../tree-districts-util.service';

@Pipe({ name: 'filter' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

@Pipe({ name: 'ColumnizeArray' })
class MockColumnizePipe implements PipeTransform {
  transform(value: any): any {
    return [];
  }
}

describe('TreeLocationsProhibitedComponent', () => {
  let component: TreeLocationsProhibitedComponent;
  let fixture: ComponentFixture<TreeLocationsProhibitedComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeLocationsProhibitedComponent, TreeLocationsProhibitedComponent, FilterPipe, MockColumnizePipe],
        providers: [FilterPipe, TreeDistrictsUtilService]
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

  it('should get prohibited districts', () => {
    component.ngOnChanges();
    expect(component.prohibitedDistricts[0].locations[0].id).toEqual(31);
  });

  it('should not populate districts if forest is null', () => {
    component.forest = {};
    component.ngOnChanges();
    const spy = sinon.spy(component, 'populateDistricts');
    expect(spy.called).toBeFalsy();
  });
});

