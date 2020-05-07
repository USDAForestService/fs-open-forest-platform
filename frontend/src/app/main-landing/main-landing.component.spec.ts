import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EsriMapComponent } from '../esri-map/esri-map.component';
import { MainLandingComponent } from './main-landing.component';

describe('MainLandingComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLandingComponent, EsriMapComponent ]
    })
    .compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MainLandingComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should load Esri Map', async(() => {
    const fixture = TestBed.createComponent(EsriMapComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-esri-map')).not.toBe(null);
  }));
});


