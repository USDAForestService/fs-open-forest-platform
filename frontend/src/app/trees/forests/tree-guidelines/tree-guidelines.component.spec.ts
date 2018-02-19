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
import { MarkdownService } from 'ngx-md';

export class MockMarked {
  public text(text) {
    return text;
  }
}

export class MockMarkdownService {
  public renderer() {
    return new MockMarked;
  }
}


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
        treeHeight: '12',
        stumpHeight: '4',
        stumpDiameter: '12',
        startDate: moment('2000-01-02').toDate(),
        endDate: moment('2101-01-01').toDate(),
        timezone: 'America/Denver',
        cuttingAreas: {
          ELKCREEK: {'startDate': '2017-12-02 15:30:00Z', 'endDate': '2017-12-09 21:30:00Z'},
          REDFEATHERLAKES: {'startDate': '2017-12-02 15:30:00Z', 'endDate': '2017-12-10 21:30:00Z'},
          SULPHUR: {'startDate': '2017-11-01 12:00:00Z', 'endDate': '2018-01-06 21:30:00Z'},
          CANYONLAKES: {'startDate': '2017-11-27 15:30:00Z', 'endDate': '2017-12-10 21:30:00Z'}
        }
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
          { provide: MarkdownService, useClass: MockMarkdownService },
          { provide: MockMarked },
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

    it('should return formatted start and end dates', () => {
      expect(component.formatCuttingAreaDate('2017-12-02 10:00:00Z', '2017-12-02 10:00:00Z'))
      .toEqual('Dec. 2 - 2, 2017');

      expect(component.formatCuttingAreaDate('2017-12-02 01:00:00Z', '2017-12-02 01:00:00Z'))
      .toEqual('Dec. 1 - 1, 2017');

      expect(component.formatCuttingAreaDate('2017-11-02 10:00:00Z', '2017-12-09 10:00:00Z'))
      .toEqual('Nov. 2 - Dec. 9, 2017');
    });

    it('should return formatted cutting hours', () => {
      expect(component.formatCuttingAreaTime('2017-11-02 10:00:00Z', '2017-12-09 20:00:00Z'))
      .toEqual('4:00 am - 1:00 pm.');
    });

    it('should render markdown', () => {
      expect(component.markdownService.renderer.text('Test {{treeHeight}} and {{stumpHeight}} ' +
        'and {{stumpDiameter}} and {{elkCreekDate}} and {{redFeatherLakesDate}} and {{sulphurDate}} and {{canyonLakesDate}}'))
      .toEqual('Test 12 and 4 and 12 and Dec. 2 - 9, 2017 and Dec. 2 - 10, 2017 ' +
        'and Nov. 1 - Jan. 6, 2018 and Nov. 27 - Dec. 10, 2017');
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
