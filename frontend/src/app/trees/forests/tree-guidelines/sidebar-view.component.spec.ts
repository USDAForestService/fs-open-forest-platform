import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SidebarViewComponent } from './sidebar-view.component';

describe('SidebarViewComponent', () => {
  let component: SidebarViewComponent;
  let fixture: ComponentFixture<SidebarViewComponent>;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SidebarViewComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarViewComponent);
    component = fixture.debugElement.componentInstance;
    component.forest = { forestName: 'Mt. Hood' };
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
    expect(component.top).toEqual('140px');
    expect(component.position).toEqual('fixed');
  });

  it('should set absolute position if top of container is greater than 30px', () => {
    spyOn(document, 'getElementById').and.callFake(function() {
      return {
        value: 'test',
        getBoundingClientRect() {
          return { top: 30 };
        }
      };
    });
    spyOn(window, 'innerHeight').and.callFake(function() {
      return 50;
    });
    component.track(new Event('scroll'));
    expect(component.top).toEqual('270px');
    expect(component.position).toEqual('absolute');
  });
});
