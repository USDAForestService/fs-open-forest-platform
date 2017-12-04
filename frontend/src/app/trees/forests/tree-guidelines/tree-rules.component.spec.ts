import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { forest } from '../../_mocks/forest.mock';
import { TreeRulesComponent } from './tree-rules.component';
import { LineBreakFormatterPipe } from '../../../_pipes/line-break-formatter.pipe';
import { SpacesToDashesPipe } from '../../../_pipes/spaces-to-dashes.pipe';
import { UtilService } from '../../../_services/util.service';

describe('TreeRulesComponent', () => {
  let component: TreeRulesComponent;
  let fixture: ComponentFixture<TreeRulesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeRulesComponent, FilterPipe, LineBreakFormatterPipe, SpacesToDashesPipe],
        providers: [UtilService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeRulesComponent);
    component = fixture.componentInstance;
    component.forest = forest;
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
