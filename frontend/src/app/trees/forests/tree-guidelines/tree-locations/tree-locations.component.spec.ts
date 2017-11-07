import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeLocationsComponent } from './tree-locations.component';
import { forest } from '../../../_mocks/forest';
import { Component } from '@angular/core';

describe('TreeLocationsComponent', () => {
  let component: TreeLocationsComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeLocationsComponent, TestComponentWrapperComponent]
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
  template: '<app-tree-locations [forest]="forest"></app-tree-locations>'
})
class TestComponentWrapperComponent {
  forest: any;

  constructor() {
    this.forest = forest;
  }
}
