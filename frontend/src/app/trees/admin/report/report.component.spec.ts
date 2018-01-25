import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReportComponent } from './report.component';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from '../../../_services/util.service';
import { Observable } from 'rxjs/Observable';

xdescribe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;
  let formBuilder: FormBuilder;

  const mockActivatedRoute = {
    params: Observable.of({ id: 1 }),
    data: Observable.of({
      forests: [
        {
          id: 1,
          forestName: 'Arapaho and Roosevelt National Forests',
          description: 'Arapaho & Roosevelt | Colorado | Fort Collins, CO',
          forestAbbr: 'arp',
          startDate: '10/31/2018',
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
          sumOfCost: '100',
          permits: {}
        }
      });
    }
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ReportComponent],
        providers: [
          ApplicationFieldsService,
          { provide: ChristmasTreesApplicationService, useClass: MockApplicationService },
          FormBuilder,
          UtilService
        ],
        imports: [RouterTestingModule, HttpClientTestingModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });
    fixture = TestBed.createComponent(ReportComponent);
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

  it('should get forest by id', () => {
    const forest = component.getForestById('2');
    expect(forest.forestName).toEqual('Flathead National Forest');
  });

  it('should get report', () => {
    component.result = {};
    component.getReport();
    expect(component.result).toEqual({});
    component.forest = {
      id: 1,
      forestName: 'Arapaho and Roosevelt National Forests',
      description: 'Arapaho & Roosevelt | Colorado | Fort Collins, CO',
      forestAbbr: 'arp'
    };
    component.dateStatus.hasErrors = true;
    component.getReport();
    expect(component.result).toEqual({});

    component.dateStatus.hasErrors = false;
    component.form.get('forestId').setValue('1');
    component.form.get('dateTimeRange.startMonth').setValue('10');
    component.form.get('dateTimeRange.startDay').setValue('10');
    component.form.get('dateTimeRange.startYear').setValue('2017');
    component.form.get('dateTimeRange.endMonth').setValue('10');
    component.form.get('dateTimeRange.endDay').setValue('10');
    component.form.get('dateTimeRange.endYear').setValue('2018');
    expect(component.form.valid).toBeTruthy();
    component.getReport();
    expect(component.result.parameters.forestName).toEqual('Arapaho and Roosevelt National Forests');
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
    component.setStartEndDate('2');
    expect(component.form.get('dateTimeRange.startMonth').value).toEqual('10');
    expect(component.form.get('dateTimeRange.startDay').value).toEqual('31');
    expect(component.form.get('dateTimeRange.startYear').value).toEqual('2018');
    expect(component.form.get('dateTimeRange.endMonth').value).toEqual('09');
    expect(component.form.get('dateTimeRange.endDay').value).toEqual('30');
    expect(component.form.get('dateTimeRange.endYear').value).toEqual('2019');
    component.setStartEndDate('5');
    expect(component.form.get('dateTimeRange.endYear').value).toEqual('2019');
  });
});
