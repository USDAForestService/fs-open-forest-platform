import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSafetyComponent } from './safety.component';
import { forest } from '../../../_mocks/forest';

describe('TreeSafetyComponent', () => {
  let component: TreeSafetyComponent;
  let fixture: ComponentFixture<TreeSafetyComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeSafetyComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSafetyComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
