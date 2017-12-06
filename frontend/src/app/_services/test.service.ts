import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ResponseOptions, Response } from '@angular/http';

@Injectable()
export class TestService {
  configureTestingModule(declarations, providers) {
    return TestBed.configureTestingModule({
      declarations: declarations,
      providers: providers,
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }
}
