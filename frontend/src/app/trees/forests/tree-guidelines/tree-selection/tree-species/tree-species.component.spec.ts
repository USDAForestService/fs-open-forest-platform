import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FilterPipe } from '../../../../../_pipes/filter.pipe';
import { SpacesToDashesPipe } from '../../../../../_pipes/spaces-to-dashes.pipe';
import { forest } from '../../../../_mocks/forest.mock';

import { TreeSpeciesComponent } from './tree-species.component';

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-tree-species [forest]="forest"></app-tree-species>'
})
class TestComponentWrapperComponent {
  forest: any;

  constructor() {
    this.forest = forest;
  }

  statusClass(status) {
    let cssClass = '';
    switch (status) {
      case 'prohibited':
        cssClass = 'danger';
        break;
      case 'recommended':
        cssClass = 'success';
        break;
      case 'not recommended':
        cssClass = 'tan';
        break;
    }
    return cssClass;
  }
}

describe('TreeSpeciesComponent', () => {
  let component: TreeSpeciesComponent;
  let fixture: ComponentFixture<TreeSpeciesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeSpeciesComponent, TestComponentWrapperComponent, FilterPipe, SpacesToDashesPipe],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSpeciesComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change css class', () => {
    expect(component.statusClass('prohibited')).toEqual('danger');
    expect(component.statusClass('recommended')).toEqual('success');
    expect(component.statusClass('not recommended')).toEqual('tan');
    expect(component.statusClass('asdf')).toEqual('');
  });
});

