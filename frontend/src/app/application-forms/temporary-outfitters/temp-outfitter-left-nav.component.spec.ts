import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TempOutfitterLeftNavComponent } from './temp-outfitter-left-nav.component';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { UtilService } from '../../_services/util.service';
import { FormBuilder, Validators } from '@angular/forms';

describe('TempOutfitterLeftNavComponent', () => {
  let component: TempOutfitterLeftNavComponent;
  let fixture: ComponentFixture<TempOutfitterLeftNavComponent>;
  let formBuilder: FormBuilder;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TempOutfitterLeftNavComponent],
        providers: [{ provide: UtilService, useClass: UtilService }, ApplicationFieldsService, FormBuilder],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    formBuilder = new FormBuilder();
    fixture = TestBed.createComponent(TempOutfitterLeftNavComponent);
    component = fixture.debugElement.componentInstance;
    component.applicationForm = formBuilder.group({
      applicantInfo: formBuilder.group({
        addAdditionalPhone: [false],
        emailAddress: ['', [Validators.required, Validators.email]],
        organizationName: [''],
        primaryFirstName: ['', [Validators.required]],
        primaryLastName: ['', [Validators.required]],
        orgType: ['', [Validators.required]],
        website: ['', [Validators.pattern('https?://.+')]],
        goodStandingEvidence: ['']
      }),
      guideIdentification: [''],
      operatingPlan: [''],
      liabilityInsurance: ['', [Validators.required]],
      acknowledgementOfRisk: [''],
      tempOutfitterFields: formBuilder.group({
        individualIsCitizen: [false],
        smallBusiness: [false],
        advertisingDescription: [''],
        advertisingURL: [''],
        noPromotionalWebsite: [''],
        clientCharges: [''],
        experienceList: [''],
        experienceFields: formBuilder.group({
          haveNationalForestPermits: [false],
          listAllNationalForestPermits: [''],
          haveOtherPermits: [false],
          listAllOtherPermits: [''],
          haveCitations: [false],
          listAllCitations: ['']
        })
      })
    });
    component.currentSection = 'test';
    component.bottom = '10px';
    component.top = '20px';
    component.position = 'absolute';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should set fixed position if top of container is less than 20px', () => {
    spyOn(document, 'getElementById').and.callFake(function() {
      return {
        value: 'test',
        getBoundingClientRect() {
          return { top: 19 };
        }
      };
    });
    component.track(new Event('scroll'));
    expect(component.top).toEqual('40px');
    expect(component.position).toEqual('fixed');
  });

  it('should set absolute position if top of container is greator than 20px', () => {
    spyOn(document, 'getElementById').and.callFake(function() {
      return {
        value: 'test',
        getBoundingClientRect() {
          return { top: 20 };
        }
      };
    });
    spyOn(window, 'innerHeight').and.callFake(function() {
      return 50;
    });
    component.track(new Event('scroll'));
    expect(component.top).toEqual('250px');
    expect(component.position).toEqual('absolute');
  });

  it('should update current section on changes', () => {
    component.currentSection = 'section-guide-identification';
    component.ngOnChanges();
    expect(component.applicationForm.controls.guideIdentification.touched).toBeTruthy();
    component.currentSection = 'section-operating-plan';
    component.ngOnChanges();
    expect(component.applicationForm.controls.operatingPlan.touched).toBeTruthy();
    component.currentSection = 'section-acknowledgement-of-risk';
    component.ngOnChanges();
    expect(component.applicationForm.controls.acknowledgementOfRisk.touched).toBeTruthy();
    component.currentSection = 'section-experience';
    component.ngOnChanges();
    expect(
      component.applicationForm.controls.tempOutfitterFields.controls.experienceFields.controls
        .listAllNationalForestPermits.touched
    ).toBeTruthy();
  });

  it('should get control status', () => {
    const control = component.applicationForm.get('guideIdentification');
    expect(component.getControlStatus(control)).toBe('ng-untouched');
    control.markAsTouched();
    expect(component.getControlStatus(control)).toBe('ng-valid');
    const control2 = component.applicationForm.get('liabilityInsurance');
    control2.markAsTouched();
    expect(component.getControlStatus(control2)).toBe('ng-invalid');
  });

  it('should get group status', () => {
    const group = component.applicationForm.get('tempOutfitterFields');
    expect(component.getGroupStatus(group, false)).toBe('ng-untouched');
    group.markAsTouched();
    expect(component.getGroupStatus(group, false)).toBe('ng-valid');
    const group2 = component.applicationForm.get('applicantInfo');
    group.markAsTouched();
    expect(component.getGroupStatus(group2, true)).toBe('ng-invalid');
  });
});
