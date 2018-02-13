import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TreeToolsComponent } from './tree-tools.component';
import { FilterPipe } from '../../../../../_pipes/filter.pipe';
import { SpacesToDashesPipe } from '../../../../../_pipes/spaces-to-dashes.pipe';
import { forest } from '../../../../_mocks/forest.mock';

describe('TreeToolsComponent', () => {
  let component: TreeToolsComponent;
  let fixture: ComponentFixture<TreeToolsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeToolsComponent, FilterPipe, SpacesToDashesPipe],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeToolsComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
