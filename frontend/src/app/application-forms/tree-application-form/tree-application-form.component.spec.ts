import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TreeApplicationFormComponent } from './tree-application-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TreesService } from '../../trees/_services/trees.service';
import { ApplicationService } from '../../_services/application.service';
import { treeApplicationMock } from './tree-application.mock';

class MockApplicationService {
  create(): Observable<{}> {
    return Observable.of(treeApplicationMock);
  }
}

describe('TreeApplicationFormComponent', () => {
  let component: TreeApplicationFormComponent;
  let fixture: ComponentFixture<TreeApplicationFormComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeApplicationFormComponent],
        providers: [
          { provide: FormBuilder, useClass: FormBuilder },
          { provide: TreesService, useClass: TreesService },
          { provide: ApplicationService, useClass: MockApplicationService },
          {
            provide: ActivatedRoute,
            useValue: {
              data: Observable.of({
                forest: { id: '1', forestName: 'Mt Hood', orgStructureCode: '123', treeCost: 10, maxNumTrees: 5 }
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

  it('should submit application', () => {
    component.onSubmit();
    expect(component.submitted).toBeFalsy();
    component.applicationForm.get('firstName').setValue('test');
    component.applicationForm.get('lastName').setValue('test');
    component.applicationForm.get('emailAddress').setValue('test@test.com');
    component.applicationForm.get('quantity').setValue('2');
    component.onSubmit();
    expect(component.application).toBeTruthy();
  });

  it('should update total cost', () => {
    component.applicationForm.get('quantity').setValue('test');
    expect(component.applicationForm.get('totalCost').value).toEqual(0);
    component.applicationForm.get('quantity').setValue('3');
    expect(component.applicationForm.get('totalCost').value).toEqual(30);
  });
});
