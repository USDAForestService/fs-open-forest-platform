import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { forest } from '../../_mocks/forest.mock';
import { TreeCuttingDatesComponent } from './tree-cutting-dates.component';
import { Pipe, PipeTransform } from '@angular/core';
import { LineBreakFormatterPipe } from '../../../_pipes/line-break-formatter.pipe';
import * as sinon from 'sinon';

describe('TreeCuttingDatesComponent', () => {
  let component: TreeCuttingDatesComponent;
  let fixture: ComponentFixture<TreeCuttingDatesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeCuttingDatesComponent, FilterPipe, LineBreakFormatterPipe]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCuttingDatesComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort cutting areas and hours into districts', () => {
    component.populateDistricts();
    expect(component.districtsWithHoursAndDates[0].locations[0].district).toEqual('cutting area');
  });

  it('should sort permit sales for districts', () => {
    component.ngOnChanges();
    expect(component.districtsWithPermits[0].locations[0].district).toEqual('district');
    expect(component.districtsWithPermits[0].locations[0].description).toEqual('permit sales dates');
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

@Pipe({ name: 'LineBreakFormatter' })
class MockLBPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
