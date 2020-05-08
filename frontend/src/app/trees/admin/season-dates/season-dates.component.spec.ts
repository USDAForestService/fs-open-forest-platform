import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from '../../../_services/util.service';
import { Observable } from 'rxjs/Observable';
import { AdminSeasonDatesComponent } from './season-dates.component';
import { ChristmasTreesAdminService } from '../christmas-trees-admin.service';
import { Title } from '@angular/platform-browser';

describe('Season Dates Admin Component', () => {
  let component: AdminSeasonDatesComponent;
  let fixture: ComponentFixture<AdminSeasonDatesComponent>;
  let formBuilder: FormBuilder;

  const mockActivatedRoute = {
    params: Observable.of({ id: 1 }),
    data: Observable.of({
      user: { email: 'test@test.com', role: 'admin', forests: ['arp', 'mthood', 'flathead'] },
      forests: [
        {
          id: 1,
          forestName: 'Arapaho and Roosevelt National Forests',
          description: 'Arapaho & Roosevelt | Colorado | Fort Collins, CO',
          forestAbbr: 'arp',
          startDate: '10/30/2018',
          endDate: '9/30/2019'
        },
        {
          id: 2,
          forestName: 'Flathead National Forest',
          description: 'Flathead | Montana | Kalispell, MT',
          forestAbbr: 'flathead',
          startDate: '10/31/2018',
          endDate: '9/30/2019'
        },
        {
          id: 3,
          forestName: 'Mt. Hood National Forest',
          description: 'Mt. Hood | Oregon | Portland, OR',
          forestAbbr: 'mthood'
        },
        {
          id: 4,
          forestName: 'Shoshone National Forest',
          description: 'Shoshone | Montana, Wyoming | Cody, WY, Jackson, WY',
          forestAbbr: 'shoshone'
        }
      ]
    })
  };

  class MockApplicationService {
    getAllByDateRange(): Observable<{}> {
      return Observable.of({
        parameters: {
          forestName: 'Arapaho and Roosevelt National Forests',
          startDate: '10/10/2018',
          endDate: '10/10/2019',
          sumOfTrees: '12',
          sumOfCost: '100'
        }
      });
    }

    updateSeasonDates(): Observable<{}> {
      return Observable.of({});
    }
  }

  describe('', () => {
    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          declarations: [AdminSeasonDatesComponent],
          providers: [
            ApplicationFieldsService,
            {provide: ChristmasTreesApplicationService, useClass: MockApplicationService},
            FormBuilder,
            RouterTestingModule,
            Title,
            ChristmasTreesAdminService,
            UtilService
          ],
          imports: [RouterTestingModule, HttpClientTestingModule],
          schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, {useValue: mockActivatedRoute});
      fixture = TestBed.createComponent(AdminSeasonDatesComponent);
      component = fixture.debugElement.componentInstance;
      formBuilder = new FormBuilder();
      component.form = formBuilder.group({
        forestId: ['', [Validators.required]],
        dateTimeRange: formBuilder.group({
          endDateTime: [''],
          endDay: [''],
          endMonth: [''],
          endYear: [''],
          endHour: [''],
          endMinutes: ['00'],
          endPeriod: [''],
          startDateTime: [''],
          startDay: [''],
          startMonth: [''],
          startYear: [''],
          startHour: [''],
          startMinutes: ['00'],
          startPeriod: ['']
        })
      });
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });


    it('should update season dates', () => {
      component.updateStatus = '';
      component.forest = {
        id: 1,
        forestName: 'Arapaho and Roosevelt National Forests',
        description: 'Arapaho & Roosevelt | Colorado | Fort Collins, CO',
        forestAbbr: 'arp'
      };

      component.dateStatus.hasErrors = false;
      component.form.get('forestId').setValue('1');
      component.form.get('dateTimeRange.startMonth').setValue('10');
      component.form.get('dateTimeRange.startDay').setValue('10');
      component.form.get('dateTimeRange.startYear').setValue('2017');
      component.form.get('dateTimeRange.endMonth').setValue('10');
      component.form.get('dateTimeRange.endDay').setValue('10');
      component.form.get('dateTimeRange.endYear').setValue('2018');
      expect(component.form.valid).toBeTruthy();
      component.updateSeasonDates();
    });

    it('should update date status', () => {
      component.updateDateStatus({
        startDateTimeValid: false,
        endDateTimeValid: false,
        startBeforeEnd: false,
        startAfterToday: false,
        hasErrors: false,
        dateTimeSpan: 0
      });
      expect(component.dateStatus).toEqual({
        startDateTimeValid: false,
        endDateTimeValid: false,
        startBeforeEnd: false,
        startAfterToday: false,
        hasErrors: false,
        dateTimeSpan: 0
      });
    });

    it('should set start and end dates', () => {
      component.forest = component.forests.find(forest => forest.id === 2);

      component.setStartEndDate(component.forest, component.form);
      expect(component.form.get('dateTimeRange.startMonth').value).toEqual('10');
      expect(component.form.get('dateTimeRange.startDay').value).toEqual('31');
      expect(component.form.get('dateTimeRange.startYear').value).toEqual('2018');
      expect(component.form.get('dateTimeRange.endMonth').value).toEqual('09');
      expect(component.form.get('dateTimeRange.endDay').value).toEqual('30');
      expect(component.form.get('dateTimeRange.endYear').value).toEqual('2019');

      component.forest = component.forests.find(forest => forest.id === 5);
      component.setStartEndDate(component.forest, component.form);
      expect(component.form.get('dateTimeRange.endYear').value).toEqual('2019');
    });

    it('should change the forest when the forestId changes', async(() => {
      component.form.get('forestId').setValue(2);
      fixture.whenStable().then(() => {
        expect(component.form.get('dateTimeRange.startMonth').value).toEqual('10');
      });
    }));
  });

});
