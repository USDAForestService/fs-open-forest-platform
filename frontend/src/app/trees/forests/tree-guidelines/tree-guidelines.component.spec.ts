import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TreeGuidelinesComponent } from './tree-guidelines.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../../../_services/util.service';
import { Title } from '@angular/platform-browser';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment';


describe('TreeGuidelinesComponent', () => {
  let component: TreeGuidelinesComponent;
  let fixture: ComponentFixture<TreeGuidelinesComponent>;
  const mockRoute = {
    params: Observable.of({ id: 1 }),
    data: Observable.of({
      forest: {
        forestName: 'forest name',
        species: {
          status: 'test'
        },
        startDate: moment('2000-01-02').toDate(),
        endDate: moment('2101-01-01').toDate(),
        timezone: 'America/Denver'
      }
    })
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeGuidelinesComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          UtilService,
          { provide: Title, useClass: Title },
          { provide: SidebarConfigService, useClass: SidebarConfigService }
        ],
        imports: [HttpClientTestingModule, RouterTestingModule]
      }).compileComponents();
    })
  );

  describe ('', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, { useValue: mockRoute });
      fixture = TestBed.createComponent(TreeGuidelinesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set forest on init', () => {
      const forest: any = component.forest;
      expect(forest.forestName).toEqual('forest name');
    });

    it ('should set the forest isSeasonOpen to true', () => {
      const forest: any = component.forest;
      expect(forest.isSeasonOpen).toBeTruthy();
    });
  });

  describe ('season closed', () => {
    it ('should set the forest isSeasonOpen and seasonOpenAlert when season not started.', () => {
      const mockSeasonNotOpenRoute = {
        params: Observable.of({ id: 1 }),
        data: Observable.of({
          forest: {
            forestName: 'forest name',
            species: {
              status: 'test'
            },
            startDate: moment('2100-01-02').toDate(),
            endDate: moment('2101-01-01').toDate(),
            timezone: 'America/Denver'
          }
        })
      };
      TestBed.overrideProvider(ActivatedRoute, { useValue: mockSeasonNotOpenRoute });
      fixture = TestBed.createComponent(TreeGuidelinesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const forest: any = component.forest;
      expect(forest.isSeasonOpen).toBeFalsy();
      expect(forest.seasonOpenAlert).toEqual('Online permits become available for purchase on Jan. 2, 2100.');
    });

    it ('should set the forest isSeasonOpen and seasonOpenAlert when season not configured', () => {
      const mockSeasonNotOpenRoute = {
        params: Observable.of({ id: 1 }),
        data: Observable.of({
          forest: {
            forestName: 'forest name',
            species: {
              status: 'test'
            },
            startDate: moment('2000-01-02').toDate(),
            endDate: moment('2001-01-01').toDate(),
            timezone: 'America/Denver'
          }
        })
      };
      TestBed.overrideProvider(ActivatedRoute, { useValue: mockSeasonNotOpenRoute });
      fixture = TestBed.createComponent(TreeGuidelinesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const forest: any = component.forest;
      expect(forest.isSeasonOpen).toBeFalsy();
      expect(forest.seasonOpenAlert).toEqual(component.seasonOpenAlert);
    });
  });

});
