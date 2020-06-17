import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FilterPipe } from '../../../../_pipes/filter.pipe';
import { forest } from '../../../../_mocks/forest.mock';
import { CuttingDatesMinComponent } from './cutting-dates-min.component';
import { WindowRef } from '../../../../_services/native-window.service';
import { NgxMdModule } from 'ngx-md';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatexPipe } from '../../../../_pipes/datex.pipe';

describe('CuttingDatesMinComponent', () => {
  let component: CuttingDatesMinComponent;
  let fixture: ComponentFixture<CuttingDatesMinComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CuttingDatesMinComponent, FilterPipe, DatexPipe],
        providers: [WindowRef, NgxMdModule],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [HttpClientTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CuttingDatesMinComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
