import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TreeApplicationFormComponent } from './tree-application-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { TreesService } from '../../trees/_services/trees.service';
import { ApplicationService } from '../../_services/application.service';

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
          { provide: ApplicationService, useClass: ApplicationService }
        ],
        imports: [RouterTestingModule, HttpModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeApplicationFormComponent);
    component = fixture.componentInstance;
    component.forest = { forestName: 'test' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
