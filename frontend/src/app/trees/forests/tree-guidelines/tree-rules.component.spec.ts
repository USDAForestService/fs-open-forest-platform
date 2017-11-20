import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { forest } from '../../_mocks/forest.mock';
import { TreeRulesComponent } from './tree-rules.component';
import { Pipe, PipeTransform } from '@angular/core';
import { LineBreakFormatterPipe } from '../../../_pipes/line-break-formatter.pipe';

describe('TreeRulesComponent', () => {
  let component: TreeRulesComponent;
  let fixture: ComponentFixture<TreeRulesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeRulesComponent, FilterPipe, LineBreakFormatterPipe]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeRulesComponent);
    component = fixture.componentInstance;
    component.forest = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate districts on changes', () => {
    component.ngOnChanges();
    component.forest = forest;
    component.ngOnChanges();
    expect(component.districtsWithPermits[0].id).toEqual(35);
    expect(component.districtsWithHoursAndDates[0].id).toEqual(34);
  });
});
