import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TreeGuidelinesComponent } from './tree-guidelines.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { MarkdownService } from 'ngx-md';
import { ChristmasTreesInfoService } from '../../_services/christmas-trees-info.service';
import { MockMarkdownService } from '../../../_mocks/markdownService.mock';
import { forest } from '../../../_mocks/forest.mock';

describe('TreeGuidelinesComponent', () => {
  let component: TreeGuidelinesComponent;
  let fixture: ComponentFixture<TreeGuidelinesComponent>;
  const mockRoute = {
    params: Observable.of({ id: 1 }),
    data: Observable.of({forest: forest})
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeGuidelinesComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          ChristmasTreesInfoService,
          { provide: MarkdownService, useClass: MockMarkdownService },
          { provide: Title, useClass: Title },
          { provide: SidebarConfigService, useClass: SidebarConfigService }
        ],
        imports: [HttpClientTestingModule, RouterTestingModule]
      }).compileComponents();
    })
  );

  describe('', () => {
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
      expect(component.forest.forestName).toEqual('Mt. Hood');
    });

    it('should set the forest isSeasonOpen to true', () => {
      expect(component.forest.isSeasonOpen).toBeTruthy();
    });

    it('should render markdown', () => {
      expect(
        component.markdownService.renderer.text(
          'Test {{treeHeight}} and {{stumpHeight}} and {{stumpDiameter}} and {{elkCreekDate}} and {{redFeatherLakesDate}} and {{sulphurDate}} and {{canyonLakesDate}}'
        )
      ).toEqual(
        'Test 12 and 6 and 6 and Dec 2 - 9, 2017 and Dec 2 - 10, 2017 and Nov 1, 2017 -  Jan 6, 2018 and Nov 27 - Dec 10, 2017'
      );
    });
  });

  describe('season closed', () => {
    it('should set the forest isSeasonOpen and seasonOpenAlert when season not started.', () => {
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

      expect(component.forest.isSeasonOpen).toBeFalsy();
      expect(component.forest.seasonOpenAlert).toEqual('Online permits become available for purchase on Jan 2, 2100.');
    });

    it('should set the forest isSeasonOpen and seasonOpenAlert when season not configured', () => {
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

      expect(component.forest.isSeasonOpen).toBeFalsy();
      expect(component.forest.seasonOpenAlert).toEqual(component.seasonOpenAlert);
    });
  });
});
