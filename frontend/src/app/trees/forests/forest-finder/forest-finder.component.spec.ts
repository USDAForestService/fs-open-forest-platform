import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ForestFinderComponent } from './forest-finder.component';
import { ForestService } from '../../_services/forest.service';

describe('ForestFinderComponent', () => {
  let component: ForestFinderComponent;
  let fixture: ComponentFixture<ForestFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForestFinderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: ForestService, useClass: ForestService }, { provide: XHRBackend, useClass: MockBackend }],
      imports: [HttpModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should get forest object',
    inject([ForestService, XHRBackend], (service, mockBackend) => {
      const mockResponse = [
        {
          'id': 1,
          'forestName': 'Forest National Forest'
        }
      ];
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service.getAll().subscribe(result => {
        expect(result[0].forestName).toBe('Forest National Forest');
      });
    })
  );


});
