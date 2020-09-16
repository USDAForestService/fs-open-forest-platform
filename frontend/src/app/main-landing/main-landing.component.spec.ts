import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLandingComponent } from './main-landing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('MainLandingComponent', () => {
  let component: MainLandingComponent;
  let fixture: ComponentFixture<MainLandingComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, RouterTestingModule],
        declarations: [MainLandingComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
