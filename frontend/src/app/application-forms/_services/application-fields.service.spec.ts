import { TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ApplicationFieldsService } from './application-fields.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { alphanumericValidator } from '../validators/alphanumeric-validation';

describe('ApplicationFieldsService', () => {
  let service: ApplicationFieldsService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    service = new ApplicationFieldsService(formBuilder);
    formBuilder = new FormBuilder();
    TestBed.configureTestingModule({
      providers: [ApplicationFieldsService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule]
    });
  });

  it('change validation when toggle field is checked', () => {
    const dataField = new FormControl('');

    service.updateValidators(dataField, true);

    dataField.updateValueAndValidity();

    expect(dataField.valid).toBeFalsy();

    dataField.setValue('test');

    service.updateValidators(dataField, false);

    expect(dataField.valid).toBeTruthy();
  });

  it('should add address and remove address control', () => {
    const parentForm = formBuilder.group({
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
    const form = formBuilder.group({
      name: ['', [Validators.required]],
      name2: ['', [Validators.required]]
    });

    service.touchAllFields(form);

    expect(form.touched).toBeTruthy();
  });

  it('should check if control has errors', () => {
    const form = formBuilder.group({
      name: ['', [Validators.required]],
      name2: ['', [Validators.required]]
    });

    expect(service.doesControlHaveErrors(form)).toBeFalsy();

    service.touchAllFields(form);

    expect(service.doesControlHaveErrors(form)).toBeTruthy();
  });

  it('should check child for errors', () => {
    const form = formBuilder.group({
      name: [''],
      child: formBuilder.group({
        childName: ['', [Validators.required, Validators.email, alphanumericValidator()]],
        secondChild: formBuilder.group({
          childName: ['', [Validators.required, Validators.email, alphanumericValidator()]]
        })
      })
    });

    expect(service.doesControlHaveErrors(form)).toBeFalsy();

    service.touchAllFields(form);

    expect(service.doesControlHaveErrors(form)).toBeTruthy();
  });

  it('should parse form to determine how many files to upload and get and remove numbers of files', () => {
    const form = formBuilder.group({
      file1: [''],
      file2: ['test'],
      file3: ['test'],
      file4: ['']
    });
    expect(
      service.parseNumberOfFilesToUpload([
        form.controls.file1,
        form.controls.file2,
        form.controls.file3,
        form.controls.file4
      ])
    ).toEqual(2);
    expect(service.getNumberOfFiles()).toEqual(2);
    service.setNumberOfFiles(4);
    service.removeOneFile();
    expect(service.getNumberOfFiles()).toEqual(3);
    expect(service.getFileUploadProgress(5)).toEqual(3);
  });

  it('should set file upload error', () => {
    service.setFileUploadError(true);
    expect(service.fileUploadError).toBeTruthy();
  });

  it('should return editApplication', () => {
    service.setEditApplication(true);
    expect(service.getEditApplication()).toBeTruthy();
  });

  it('should add and remove evening phone', () => {
    const form = formBuilder.group({
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
    const form = formBuilder.group({
      name: [''],
      address: formBuilder.group({
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
    const form = formBuilder.group({
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
    const form = formBuilder.group({
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
});
