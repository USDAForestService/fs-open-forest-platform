import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FilterPipe } from '../../../../_pipes/filter.pipe';
import { forest } from '../../../../_mocks/forest.mock';
import { CuttingDatesComponent } from './cutting-dates.component';
import { WindowRef } from '../../../../_services/native-window.service';
import { NgxMdModule } from 'ngx-md';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatexPipe } from '../../../../_pipes/datex.pipe';

describe('CuttingDatesComponent', () => {
  let component: CuttingDatesComponent;
  let fixture: ComponentFixture<CuttingDatesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CuttingDatesComponent, FilterPipe, DatexPipe],
        providers: [WindowRef, NgxMdModule],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [HttpClientTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CuttingDatesComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
