import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TreeApplicationFormComponent } from './tree-application-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TreesService } from '../../trees/_services/trees.service';
import { treeApplicationMock } from './tree-application.mock';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Title } from '@angular/platform-browser';
import { ChristmasTreesApplicationService } from '../../trees/_services/christmas-trees-application.service';
import { UtilService } from '../../_services/util.service';
import * as sinon from 'sinon';

class MockApplicationService {
  create(): Observable<{}> {
    return Observable.throw('error');
  }
}

describe('TreeApplicationFormComponent', () => {
  let component: TreeApplicationFormComponent;
  let fixture: ComponentFixture<TreeApplicationFormComponent>;
  let userService: Title;

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
                  maxNumTrees: 5
                }
              })
            }
          }
        ],
        imports: [RouterTestingModule, HttpModule],
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
    expect(userService.getTitle()).toBe(
      'Buy a Christmas tree permit in Mt Hood National Forest | U.S. Forest Service Christmas Tree Permitting'
    );
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
});
