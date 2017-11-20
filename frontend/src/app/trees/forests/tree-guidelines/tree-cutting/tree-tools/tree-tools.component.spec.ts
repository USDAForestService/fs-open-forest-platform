import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
    component.prohibitedTree = component.findTreeByName('Pacific Yew');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find trees by name on changes', () => {
    component.ngOnChanges();
    expect(component.prohibitedTree['name']).toEqual('Pacific Yew');
    const species = component.findTreeByName('Pacific Yew');
    expect(species.name).toEqual('Pacific Yew');
    expect(species.status).toEqual('prohibited');
  });
});
