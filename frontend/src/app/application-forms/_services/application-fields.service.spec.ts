import { inject, TestBed } from '@angular/core/testing';
import { ApplicationFieldsService } from './application-fields.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import * as sinon from 'sinon';

describe('ApplicationFieldsService', () => {

  let service: ApplicationFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplicationFieldsService,
        FormBuilder
      ]
    });
  });

  beforeEach(inject([ApplicationFieldsService], (svc) => {
    service = svc;
  }));

  it('should return true if error', () => {
    const dataField = new FormControl('');
    dataField.markAsTouched();
    dataField.setErrors(['error']);

    expect(service.hasError(dataField)).toBeTruthy();
  });

  it('should return error id error', () => {
    const dataField = new FormControl('');
    dataField.markAsTouched();
    dataField.setErrors(['error']);

    expect(service.labelledBy(dataField, 'label-id', 'error-id')).toEqual('error-id');
  });

  it('should return label id if no error', () => {
    const dataField = new FormControl('');
    dataField.markAsTouched();

    expect(service.labelledBy(dataField, 'label-id', 'error-id')).toEqual('label-id');
  });


  it('change validation when toggle field is checked', () => {
    const dataField = new FormControl('');

    service.updateValidators(dataField, true, 255);

    dataField.updateValueAndValidity();

    expect(dataField.valid).toBeFalsy();

    dataField.setValue(`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum neque arcu,
      sed pellentesque ante vestibulum non. In posuere ante ligula, eget faucibus odio cursus
      nec. Vestibulum quis sagittis magna, at interdum arcu. Quisque elit purus nullam.
      ;laksdjf alksdfj ;alskdjf ;alsdkfj a;lsdkfjads;lfkj as;dlfkja sdf`);

    service.updateValidators(dataField, true, 255);

    expect(dataField.valid).toBeFalsy();

    dataField.setValue(`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
      interdum neque arcu, sed pellentesque ante vestibulum non.
      In posuere ante ligula, eget faucibus odio cursus nec. Vestibulum
      quis sagittis magna,`);

    expect(dataField.valid).toBeTruthy();
  });

  it('should add address and remove address control', () => {

    const parentForm = service.formBuilder.group({
      name: ['']
    });

    service.addAddress(parentForm, 'address');
    expect(parentForm.controls.address).toBeTruthy();

    service.removeAddress(parentForm, 'address');
    expect(parentForm.controls.address).toBeFalsy();
  });

  it('should touch a field and update validity', () => {

    const dataField = new FormControl('', [Validators.required]);

    service.touchField(dataField);

    expect(dataField.touched).toBeTruthy();
  });

  it('should touch all fields and update their validity', () => {

    const form = service.formBuilder.group({
      name: ['', [Validators.required]],
      name2: ['', [Validators.required]]
    });

    service.touchAllFields(form);

    expect(form.touched).toBeTruthy();
  });

  it('should check if control has errors', () => {
    const form = service.formBuilder.group({
      name: ['', [Validators.required]],
      name2: ['', [Validators.required]]
    });

    expect(service.doesControlHaveErrors(form)).toBeFalsy();

    service.touchAllFields(form);

    expect(service.doesControlHaveErrors(form)).toBeTruthy();
  });

  it('should check child for errors', () => {
    const form = service.formBuilder.group({
      name: [''],
      child: service.formBuilder.group({
        childName: ['', [Validators.required, Validators.email, alphanumericValidator()]],
        secondChild: service.formBuilder.group({
          childName: ['', [Validators.required, Validators.email, alphanumericValidator()]]
        })
      })
    });

    expect(service.doesControlHaveErrors(form)).toBeFalsy();

    service.touchAllFields(form);

    expect(service.doesControlHaveErrors(form)).toBeTruthy();
  });

  it('should return editApplication', () => {
    service.setEditApplication(true);
    expect(service.getEditApplication()).toBeTruthy();
  });

  it('should add and remove evening phone', () => {
    const form = service.formBuilder.group({
      name: ['']
    });
    service.addAdditionalPhone(form);
    expect(form.get('eveningPhone')).toBeTruthy();

    form.get('eveningPhone.tenDigit').setValue('1111111111');
    expect(form.get('eveningPhone.areaCode').value).toEqual('111');
    service.removeAdditionalPhone(form);
    expect(form.get('eveningPhone')).toBeFalsy();
  });

  it('should add or remove address validation', () => {
    const form = service.formBuilder.group({
      name: [''],
      address: service.formBuilder.group({
        mailingAddress: [''],
        mailingAddress2: [''],
        mailingCity: [''],
        mailingState: [''],
        mailingZIP: ['']
      })
    });
    service.addAddressValidation(form, 'address');
    form.get('address.mailingAddress').updateValueAndValidity();
    form.get('address.mailingAddress').markAsTouched();
    expect(form.get('address.mailingAddress').valid).toBeFalsy();
    service.removeAddressValidation(form, 'address');
    form.get('address.mailingAddress').updateValueAndValidity();
    expect(form.get('address.mailingAddress').valid).toBeTruthy();
  });

  it('should update validation when toggle is clicked', () => {
    const form = service.formBuilder.group({
      data: [''],
      toggle: [false]
    });
    service.simpleRequireToggle(form.get('toggle'), form.get('data'));
    form.get('toggle').setValue(true);
    form.get('data').updateValueAndValidity();
    form.get('data').markAsTouched();
    expect(form.get('data').valid).toBeFalsy();
  });

  it('should switch validation when toggle is clicked', () => {
    const form = service.formBuilder.group({
      data1: ['', [Validators.required]],
      data2: [''],
      toggle: [false]
    });
    service.toggleSwitchRequire(form.get('toggle'), form.get('data1'), form.get('data2'));
    form.get('toggle').setValue(true);
    form.get('data1').updateValueAndValidity();
    form.get('data1').markAsTouched();
    form.get('data2').updateValueAndValidity();
    form.get('data2').markAsTouched();
    expect(form.get('data1').valid).toBeTruthy();
    expect(form.get('data2').valid).toBeFalsy();
    service.toggleSwitchRequire(form.get('toggle'), form.get('data1'), form.get('data2'));
    form.get('toggle').setValue(false);
    form.get('data1').updateValueAndValidity();
    form.get('data1').markAsTouched();
    form.get('data2').updateValueAndValidity();
    form.get('data2').markAsTouched();
    expect(form.get('data1').valid).toBeFalsy();
    expect(form.get('data2').valid).toBeTruthy();
  });

  it('should be able to access setTemporaryIdToNull function', () => {
    const spy = sinon.spy(service, 'setTemporaryIdToNull');
    service.setTemporaryIdToNull(null);
    expect(spy.called).toBeTruthy();
  });

  describe('get invalid element', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should get invalid element by id', () => {

      const element = service.doc.createElement('input');
      element.setAttribute('id', 'test');
      element.setAttribute('class', 'ng-invalid');

      const idStub = sandbox.stub(service.doc, 'getElementById');
      idStub.returns(element);

      expect(service.getInvalidElement(element).getAttribute('id')).toEqual('test');
    });

    it('should get invalid element by class', () => {

      const element = service.doc.createElement('input');
      element.setAttribute('id', 'test');
      element.setAttribute('class', 'ng-invalid');

      const idStub = sandbox.stub(service.doc, 'getElementById');
      idStub.onFirstCall().returns(null);
      idStub.onSecondCall().returns(element);

      const classStub = sandbox.stub(service.doc, 'getElementsByClassName');
      classStub.returns([element]);

      expect(service.getInvalidElement(element).getAttribute('id')).toEqual('temporaryId');
    });

    it('should set temporaryId to null', () => {
      const element = service.doc.createElement('input');
      element.setAttribute('id', 'temporaryId');
      element.setAttribute('class', 'ng-invalid');

      service.setTemporaryIdToNull(element);
      expect(element.getAttribute('id')).toBe('null');
    });

    it('should scroll to first error', () => {
      const element = service.doc.createElement('input');
      element.setAttribute('id', 'temporaryId');
      element.setAttribute('class', 'ng-invalid');

      const stub = sandbox.stub(service.doc, 'querySelectorAll');
      stub.returns([element]);

      const invalidElementStub = sandbox.stub(service, 'getInvalidElement');
      invalidElementStub.returns(element);
      service.scrollToFirstError();
      expect(element.getAttribute('id')).toBe('null');
    });
  });

});
