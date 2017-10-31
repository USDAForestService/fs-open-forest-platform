import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { UtilService } from '../_services/util.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SidebarComponent],
        providers: [{ provide: UtilService, useClass: MockUtilService }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.debugElement.componentInstance;
    component.items = [];
    component.currentSection = 'test';
    component.bottom = '10px';
    component.top = '20px';
    component.position = 'absolute';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set fixed position if top of container is less than 20px', () => {
    spyOn(document, 'getElementById').and.callFake(function() {
      return {
        value: 'test',
        getBoundingClientRect() {
          return { top: 19 };
        }
      };
    });
    component.track(new Event('scroll'));
    expect(component.top).toEqual('40px');
    expect(component.position).toEqual('fixed');
  });

  it('should set absolute position if top of container is greator than 20px', () => {
    spyOn(document, 'getElementById').and.callFake(function() {
      return {
        value: 'test',
        getBoundingClientRect() {
          return { top: 20 };
        }
      };
    });
    spyOn(window, 'innerHeight').and.callFake(function() {
      return 50;
    });
    component.track(new Event('scroll'));
    expect(component.top).toEqual('250px');
    expect(component.position).toEqual('absolute');
  });

  it(
    'should set current section',
    inject([UtilService], util => {
      component.gotoHashtag('test', new Event('click'));
      expect(util.currentSection).toEqual('test-section');
    })
  );
});

class MockUtilService {
  currentSection: string;
  inView = false;

  gotoHashtag(string, event) {
    this.currentSection = 'test-section';
  }

  setCurrentSection() {
    this.currentSection = 'test-section';
  }

  getElementsByClassName(className) {
    return ['test'];
  }

  addClass(string) {
    this.inView = true;
  }
  removeClass(string) {
    this.inView = false;
  }
}
