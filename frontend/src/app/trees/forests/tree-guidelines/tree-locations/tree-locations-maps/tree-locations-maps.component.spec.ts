import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { TreeLocationsMapsComponent } from './tree-locations-maps.component';
import { FilterPipe } from '../../../../../_pipes/filter.pipe';
import { SpacesToDashesPipe } from '../../../../../_pipes/spaces-to-dashes.pipe';
import { forest } from '../../../../_mocks/forest';

describe('TreeLocationsMapsComponent', () => {
  let component: TreeLocationsMapsComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeLocationsMapsComponent, TestComponentWrapperComponent, FilterPipe, SpacesToDashesPipe]
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
  template: '<app-tree-locations-maps [forest]="forest"></app-tree-locations-maps>'
})
class TestComponentWrapperComponent {
  forest: any;

  constructor() {
    this.forest = forest;
  }
}
