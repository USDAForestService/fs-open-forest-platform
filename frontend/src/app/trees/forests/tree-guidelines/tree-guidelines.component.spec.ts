import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TreeGuidelinesComponent } from './tree-guidelines.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TreesService } from '../../_services/trees.service';
import { UtilService } from '../../../_services/util.service';

describe('PermitApplicationListComponent', () => {
  let component: TreeGuidelinesComponent;
  let fixture: ComponentFixture<TreeGuidelinesComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeGuidelinesComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          UtilService,
          { provide: TreesService, useClass: TreesService },
          { provide: XHRBackend, useClass: MockBackend }
        ],
        imports: [HttpModule, RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(
    'should get forest object',
    inject([TreesService, XHRBackend], (service, mockBackend) => {
      const mockResponse = { forest: { forestName: 'forest name', species: { status: 'test' } } };
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service.getOne(1).subscribe(result => {
        expect(result.forest.forestName).toBe('forest name');
      });
    })
  );

  it(
    'should throw error if error',
    inject([TreesService, XHRBackend], (service, mockBackend) => {
      mockBackend.connections.subscribe(connection => {
        connection.mockError(new Error('error'));
      });

      service.getOne(1).subscribe(
        success => {},
        (e: any) => {
          expect(e).toEqual(['Server error']);
        }
      );
    })
  );

  it(
    'should throw error if response is error',
    inject([TreesService, XHRBackend], (service, mockBackend) => {
      mockBackend.connections.subscribe(connection => {
        connection.mockError(
          new Response(
            new ResponseOptions({
              body: { error: 'Some strange error' },
              status: 404
            })
          )
        );
      });

      service.getOne(1).subscribe(
        success => {},
        (e: any) => {
          expect(e).toEqual([404]);
        }
      );
    })
  );

  it(
    'should throw error if response is error and no status',
    inject([TreesService, XHRBackend], (service, mockBackend) => {
      mockBackend.connections.subscribe(connection => {
        connection.mockError(
          new Response(
            new ResponseOptions({
              body: { errors: 'Some strange error' }
            })
          )
        );
      });

      service.getOne(1).subscribe(
        success => {},
        (e: any) => {
          expect(e).toEqual('Some strange error');
        }
      );
    })
  );

  it('should toggle mobile nav', () => {
    component.toggleMobileNav();
    expect(component.showMobileNav).toBeTruthy();
  });

  it('should show mobile nav if screen width is greater than or equal to 951', () => {
    component.showMobileNav = true;
    component.onResize({ target: { innerWidth: 950 } });
    expect(component.showMobileNav).toBeTruthy();

    component.onResize({ target: { innerWidth: 951 } });
    expect(component.showMobileNav).toBeFalsy();
  });

  it('should set top value and position value on no scroll', () => {
    component.scroll(new Event('scroll'));
    expect(component.position).toEqual('absolute');
    expect(component.top).toEqual('inherit');
  });
});
