import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { forest } from '../../_mocks/forest';
import { TreeCuttingDatesComponent } from './tree-cutting-dates.component';

describe('TreeCuttingDatesComponent', () => {
  let component: TreeCuttingDatesComponent;
  let fixture: ComponentFixture<TreeCuttingDatesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeCuttingDatesComponent, FilterPipe]
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
});
