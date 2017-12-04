import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pipe, PipeTransform } from '@angular/core';
import { Component } from '@angular/core';
import { TreeLocationsMapsComponent } from './tree-locations-maps.component';
import { FilterPipe } from '../../../../../_pipes/filter.pipe';
import { SpacesToDashesPipe } from '../../../../../_pipes/spaces-to-dashes.pipe';
import { forest } from '../../../../_mocks/forest.mock';

describe('TreeLocationsMapsComponent', () => {
  let component: TreeLocationsMapsComponent;
  let fixture: ComponentFixture<TreeLocationsMapsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeLocationsMapsComponent, FilterPipe, SpacesToDashesPipe]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeLocationsMapsComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Pipe({ name: 'filter' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
