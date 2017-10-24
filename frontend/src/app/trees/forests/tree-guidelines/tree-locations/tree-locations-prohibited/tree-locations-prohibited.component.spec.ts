import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TreeLocationsProhibitedComponent } from './tree-locations-prohibited.component';
import { FilterPipe } from '../../../../../_pipes/filter.pipe';
import { forest } from '../../../../_mocks/forest';

describe('TreeLocationsProhibitedComponent', () => {
  let component: TreeLocationsProhibitedComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeLocationsProhibitedComponent, TestComponentWrapperComponent, FilterPipe]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-tree-locations-prohibited [forest]="forest"></app-tree-locations-prohibited>'
})
class TestComponentWrapperComponent {
  forest: any;

  constructor() {
    this.forest = forest;
  }
}
