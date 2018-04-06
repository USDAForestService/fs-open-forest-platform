import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateTimeRangeService } from './date-time-range.service';
import { FormBuilder } from '@angular/forms';

describe('DateTimeRangeService', () => {
  let service: DateTimeRangeService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    service = new DateTimeRangeService();
    formBuilder = new FormBuilder();
    TestBed.configureTestingModule({
      providers: [DateTimeRangeService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

});
