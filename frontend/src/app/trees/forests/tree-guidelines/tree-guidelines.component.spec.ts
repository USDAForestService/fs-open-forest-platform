import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TreeGuidelinesComponent } from './tree-guidelines.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TreesService } from '../../_services/trees.service';
import { UtilService } from '../../../_services/util.service';
import { MockService } from '../../../_services/mock.service';
import { Title } from '@angular/platform-browser';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';

describe('TreeGuidelinesComponent', () => {
  let component: TreeGuidelinesComponent;
  let fixture: ComponentFixture<TreeGuidelinesComponent>;
  let mockService: MockService;
  let userService: Title;
  const mockResponse = {
    forest: {
      forestName: 'forest name',
      species: {
        status: 'test'
      }
    }
  };

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(
    async(() => {
      mockService = new MockService();
      TestBed.configureTestingModule({
        declarations: [TreeGuidelinesComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          UtilService,
          { provide: TreesService, useClass: TreesService },
          { provide: XHRBackend, useClass: MockBackend },
          { provide: MockService, use: mockService },
          { provide: Title, useClass: Title },
          { provide: SidebarConfigService, useClass: SidebarConfigService }
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
      mockService.mockResponse(mockBackend, mockResponse);

      service.getOne(1).subscribe(result => {
        expect(result.forest.forestName).toBe('forest name');
      });
    })
  );

  it('should set the title', () => {
    inject([TreesService, XHRBackend], (service, mockBackend) => {
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
        userService = TestBed.get(Title);
        expect(userService.getTitle()).toBe(
          'forest name National Forest Christmas tree permit information | U.S. Forest Service Christmas Tree Permitting'
        );
      });
    });
  });

  it(
    'should throw error if error',
    inject([TreesService, XHRBackend], (service, mockBackend) => {
      mockBackend.connections.subscribe(connection => {
        connection.mockError(
          new Response(
            new ResponseOptions({
              body: { errors: [{ message: 'Some strange error' }] },
              status: 500
            })
          )
        );
      });

      service.getOne(1).subscribe(
        success => {},
        (e: any) => {
          expect(e).toEqual([
            { status: 500, message: 'Sorry, we were unable to process your request. Please try again.' }
          ]);
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
              body: { errors: [{ message: 'Some strange error' }] },
              status: 404
            })
          )
        );
      });

      service.getOne(1).subscribe(
        success => {},
        (e: any) => {
          expect(e[0].message).toEqual('The requested application is not found.');
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

  it('should have a config file', () => {
    fixture.whenStable().then(() => {
      expect(component.sidebarItems.length).toEqual(6);
    });
  });
});
