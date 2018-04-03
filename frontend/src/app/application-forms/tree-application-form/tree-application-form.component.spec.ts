import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { TreeApplicationFormComponent } from './tree-application-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ChristmasTreesInfoService } from '../../trees/_services/christmas-trees-info.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Title } from '@angular/platform-browser';
import { ChristmasTreesApplicationService } from '../../trees/_services/christmas-trees-application.service';
import { UtilService } from '../../_services/util.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import * as moment from 'moment-timezone';
import { forest } from '../../_mocks/forest.mock';
import { MarkdownService } from 'ngx-md';
import { MockMarkdownService } from '../../_mocks/markdownService.mock';
import { Location } from '@angular/common';
import { WindowRef } from '../../_services/native-window.service';

class MockApplicationService {
  create(): Observable<{}> {
    return Observable.throw('error');
  }
  cancelOldApp(permitId): Observable<{}> {
    return Observable.of({ success: 'success' });
  }
}

class DummyComponent {}

describe('TreeApplicationFormComponent', () => {
  let component: TreeApplicationFormComponent;
  let fixture: ComponentFixture<TreeApplicationFormComponent>;
  let userService: Title;

  describe('should check the season start date', () => {
    beforeEach(
      async(() => {
        forest.startDate = moment('2100-01-02').toDate();
        forest.endDate = moment('2001-01-01').toDate();
        TestBed.configureTestingModule({
          declarations: [TreeApplicationFormComponent],
          providers: [
            UtilService,
            { provide: MarkdownService, useClass: MockMarkdownService },
            { provide: FormBuilder, useClass: FormBuilder },
            { provide: Title, useClass: Title },
            ChristmasTreesInfoService,
            { provide: ChristmasTreesApplicationService, useClass: MockApplicationService },
            { provide: ApplicationFieldsService, useClass: ApplicationFieldsService },
            {
              provide: ActivatedRoute,
              useValue: {
                queryParams: [{t: '123'}],
                data: Observable.of({ forest: forest, permit: {status: 'Cancelled'} })
              }
            },
            WindowRef
          ],
          imports: [
            RouterTestingModule.withRoutes([{ path: 'christmas-trees/forests/:forest', component: DummyComponent }]),
            HttpClientTestingModule
          ],
          schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(TreeApplicationFormComponent);
      component = fixture.componentInstance;
    });

    it(
      'and redirect',
      async(
        inject([Router, Location], (router: Router, location: Location) => {
          fixture.detectChanges();

          fixture.whenStable().then(() => {
            expect(location.path()).toBe('/christmas-trees/forests/mthood');
          });
        })
      )
    );
  });

  describe('', () => {
    beforeEach(
      async(() => {
        forest.startDate = moment('2000-01-02').toDate();
        forest.endDate = moment('2100-12-31').toDate();

        TestBed.configureTestingModule({
          declarations: [TreeApplicationFormComponent],
          providers: [
            UtilService,
            { provide: MarkdownService, useClass: MockMarkdownService },
            { provide: FormBuilder, useClass: FormBuilder },
            { provide: Title, useClass: Title },
            ChristmasTreesInfoService,
            { provide: ChristmasTreesApplicationService, useClass: MockApplicationService },
            { provide: ApplicationFieldsService, useClass: ApplicationFieldsService },
            {
              provide: ActivatedRoute,
              useValue: {
                queryParams: [{t: '123'}],
                data: Observable.of({ forest: forest, permit: {status: 'Cancelled'} })
              }
            },
            WindowRef
          ],
          imports: [RouterTestingModule, HttpClientTestingModule],
          schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(TreeApplicationFormComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set the title', () => {
      userService = TestBed.get(Title);
      expect(userService.getTitle()).toBe('Buy a permit | Mt. Hood | U.S. Forest Service Christmas Tree Permitting');
    });

    it('should submit application', () => {
      component.onSubmit();
      component.applicationForm.get('firstName').setValue('test');
      component.applicationForm.get('lastName').setValue('test');
      component.applicationForm.get('emailAddress').setValue('test@test.com');
      component.applicationForm.get('quantity').setValue('2');
      component.onSubmit();
      expect(component.apiErrors).toEqual('error');
    });

    it('should update total cost', () => {
      component.applicationForm.get('quantity').setValue('test');
      expect(component.applicationForm.get('totalCost').value).toEqual(0);
      component.applicationForm.get('quantity').setValue('3');
      expect(component.applicationForm.get('totalCost').value).toEqual(30);
    });

    it('should repopulate form fields', () => {
      component.permit = {
        permitId: '123',
        firstName: 'test',
        lastName: 'test',
        emailAddress: 'test@test.com',
        quantity: '2'
      };
      component.createForm(
        {
          forest: { forest }
        },
        component.formBuilder
      );
      expect(component.applicationForm.get('firstName').value).toEqual('test');
    });
  });

  it('should render markdown', () => {
    expect(
      component.markdownService.renderer.text('Test {{treeHeight}} and {{stumpHeight}} and {{stumpDiameter}}')
    ).toEqual('Test 12 and 6 and 6');
  });

  it('should submit application rules form', () => {
    component.applicationForm.get('forestId').setValue('arp');
    component.applicationForm.get('firstName').setValue('test');
    component.applicationForm.get('lastName').setValue('test');
    component.applicationForm.get('emailAddress').setValue('test@test.com');
    component.applicationForm.get('quantity').setValue(2);
    component.showRulesForm();
    expect(component.submitted).toBeTruthy();
  });
});
