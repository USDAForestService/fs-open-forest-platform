import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { TreePermitRulesComponent } from './tree-permit-rules.component';
import { LineBreakFormatterPipe } from '../../../_pipes/line-break-formatter.pipe';
import { SpacesToDashesPipe } from '../../../_pipes/spaces-to-dashes.pipe';
import { UtilService } from '../../../_services/util.service';
import { forest } from '../../../trees/_mocks/forest.mock';

describe('TreePermitRulesComponent', () => {
  let component: TreePermitRulesComponent;
  let fixture: ComponentFixture<TreePermitRulesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreePermitRulesComponent, FilterPipe, LineBreakFormatterPipe, SpacesToDashesPipe],
        providers: [UtilService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreePermitRulesComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
