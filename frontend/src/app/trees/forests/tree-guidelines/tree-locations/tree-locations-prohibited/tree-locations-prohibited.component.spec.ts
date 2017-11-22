import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';

import { TreeLocationsProhibitedComponent } from './tree-locations-prohibited.component';
import { FilterPipe } from '../../../../../_pipes/filter.pipe';
import { forest } from '../../../../_mocks/forest.mock';
import * as sinon from 'sinon';

describe('TreeLocationsProhibitedComponent', () => {
  let component: TreeLocationsProhibitedComponent;
  let fixture: ComponentFixture<TreeLocationsProhibitedComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeLocationsProhibitedComponent, TreeLocationsProhibitedComponent, FilterPipe, MockChunkyPipe],
        providers: [FilterPipe]
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
    expect(component.prohibitedDistricts[0].childNodes[0].id).toEqual(31);
  });

  it('should not populateDistricts if forest is null', () => {
    component.forest = {};
    component.ngOnChanges();
    const spy = sinon.spy(component, 'populateDistricts');
    expect(spy.called).toBeFalsy();
  });
});

@Pipe({ name: 'filter' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

@Pipe({ name: 'ChunkArray' })
class MockChunkyPipe implements PipeTransform {
  transform(value: any): any {
    return [];
  }
}
