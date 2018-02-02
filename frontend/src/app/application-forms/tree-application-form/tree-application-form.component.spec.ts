import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { TreeApplicationFormComponent } from './tree-application-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TreesService } from '../../trees/_services/trees.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Title } from '@angular/platform-browser';
import { ChristmasTreesApplicationService } from '../../trees/_services/christmas-trees-application.service';
import { UtilService } from '../../_services/util.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as sinon from 'sinon';

import * as moment from 'moment/moment';
import { MockRouter } from '../../_mocks/routes.mock';

class MockApplicationService {
  create(): Observable<{}> {
    return Observable.throw('error');
  }
  cancelOldApp(permitId): Observable<{}> {
    return Observable.of({ success: 'success' });
  }
}

describe('TreeApplicationFormComponent', () => {
  let component: TreeApplicationFormComponent;
  let fixture: ComponentFixture<TreeApplicationFormComponent>;
  let userService: Title;

  describe('should check the season start date', () => {
    let mockRouter: MockRouter;

    beforeEach(
      async(() => {
        mockRouter = new MockRouter();
        TestBed.configureTestingModule({
          declarations: [TreeApplicationFormComponent],
          providers: [
            UtilService,
            { provide: FormBuilder, useClass: FormBuilder },
            { provide: Title, useClass: Title },
            { provide: TreesService, useClass: TreesService },
            { provide: ChristmasTreesApplicationService, useClass: MockApplicationService },
            { provide: ApplicationFieldsService, useClass: ApplicationFieldsService },
            {
              provide: ActivatedRoute,
              useValue: {
                data: Observable.of({
                  forest: {
                    id: '1',
                    forestName: 'Mt Hood',
                    orgStructureCode: '123',
                    forestAbbr: 'mthood',
                    treeCost: 10,
                    maxNumTrees: 5,
                    startDate: moment('2100-01-02').toDate(),
                    endDate: moment('2001-01-01').toDate()
                  }
                })
              }
            },
            { provide: Router, useValue: mockRouter }
          ],
          imports: [HttpClientTestingModule],
          schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(TreeApplicationFormComponent);
      component = fixture.componentInstance;
    });

    it('and redirect', () => {
      fixture.detectChanges();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/christmas-trees/forests/', 'mthood']);
    });
  });

  describe('', () => {
    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          declarations: [TreeApplicationFormComponent],
          providers: [
            UtilService,
            { provide: FormBuilder, useClass: FormBuilder },
            { provide: Title, useClass: Title },
            { provide: TreesService, useClass: TreesService },
            { provide: ChristmasTreesApplicationService, useClass: MockApplicationService },
            { provide: ApplicationFieldsService, useClass: ApplicationFieldsService },
            {
              provide: ActivatedRoute,
              useValue: {
                data: Observable.of({
                  forest: {
                    id: '1',
                    forestName: 'Mt Hood',
                    orgStructureCode: '123',
                    forestAbbr: 'mthood',
                    treeCost: 10,
                    maxNumTrees: 5,
                    startDate: moment('2000-01-02').toDate(),
                    endDate: moment('2100-12-31').toDate()
                  }
                })
              }
            }
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
      component.ngOnInit();
    });

    it('should set the title', () => {
      userService = TestBed.get(Title);
      expect(userService.getTitle()).toBe('Buy a permit | Mt Hood | U.S. Forest Service Christmas Tree Permitting');
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

    it('should go to rules', () => {
      const spy = sinon.spy(component, 'goToRules');
      component.goToRules(new Event('click'));
      expect(spy.called).toBeTruthy();
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
          forest: {
            id: '1',
            forestName: 'Mt Hood',
            orgStructureCode: '123',
            forestAbbr: 'mthood',
            treeCost: 10,
            maxNumTrees: 5
          }
        },
        component.formBuilder
      );
      expect(component.applicationForm.get('firstName').value).toEqual('test');
    });
  });
});
