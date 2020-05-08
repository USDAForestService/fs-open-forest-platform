import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';
import { UtilService } from '../_services/util.service';
import { FilterPipe } from '../_pipes/filter.pipe';
import { ChristmasTreesAdminService } from '../trees/admin/christmas-trees-admin.service';
import { WindowRef } from '../_services/native-window.service';

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

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SidebarComponent, FilterPipe],
        providers: [
          WindowRef,
          { provide: UtilService, useClass: MockUtilService },
          ChristmasTreesAdminService
        ],
        imports: [RouterTestingModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.debugElement.componentInstance;
    component.items = [ {'test': true }, { 'test': true }, { 'test2': true }, { 'test3': true }, { 'test4': true } ];
    component.bottom = '10px';
    component.top = '20px';
    component.position = 'absolute';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set fixed position if top of the container is less than items times offset', () => {
    spyOn(document, 'getElementById').and.callFake(function() {
      return {
        value: 'test',
        getBoundingClientRect() {
          return { top: 19 };
        }
      };
    });
    component.track(new Event('scroll'));
    expect(component.top).toEqual('-5px');
    expect(component.position).toEqual('fixed');
  });

  it('should set absolute position if top of the container is greater than items times offset', () => {
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
    expect(component.top).toEqual('-5px');
    expect(component.position).toEqual('fixed');
  });

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
});
