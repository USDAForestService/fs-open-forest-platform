import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EsriMapComponent } from './esri-map.component';
import { AppComponent } from '../app.component';

describe('EsriMapComponent', () => {
  let component: EsriMapComponent;
  let fixture: ComponentFixture<EsriMapComponent>;
  let app: any; // debugElement.componentInstance

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EsriMapComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(EsriMapComponent);
    app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create MapView', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mapViewNode')).toBeDefined();
  });
});
