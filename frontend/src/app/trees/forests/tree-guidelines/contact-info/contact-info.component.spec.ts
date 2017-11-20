import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoComponent } from './contact-info.component';
import { forest } from '../../../_mocks/forest.mock';
import {FilterPipe} from '../../../../_pipes/filter.pipe';
import {LineBreakFormatterPipe} from '../../../../_pipes/line-break-formatter.pipe';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ContactInfoComponent, FilterPipe, LineBreakFormatterPipe]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
