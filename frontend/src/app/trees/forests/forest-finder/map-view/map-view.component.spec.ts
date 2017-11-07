import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpacesToDashesPipe } from '../../../../_pipes/spaces-to-dashes.pipe';
import { RemovePuncPipe } from '../remove-punc.pipe';
import { forest } from '../../../_mocks/forest';


import { MapViewComponent } from './map-view.component';

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapViewComponent, SpacesToDashesPipe, RemovePuncPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewComponent);
    component = fixture.componentInstance;
    component.forests = [forest];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
