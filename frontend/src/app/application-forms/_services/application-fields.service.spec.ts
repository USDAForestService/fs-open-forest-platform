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

  it('should set and get hasFilesToUpload', () => {
    service.setHasFilesToUpload(true);
    expect(service.hasFilesToUpload).toBeTruthy();
    expect(service.getHasFilesToUpload()).toBeTruthy();
  });

  it('should add and remove files to uploading files', () => {
    expect(service.areFilesUploaded()).toBeTruthy();
    service.addUploadingFile('file');
    service.addUploadingFile('file2');
    service.addUploadingFile('file3');
    service.addUploadingFile('file4');
    expect(service.areFilesUploaded()).toBeFalsy();
    expect(service.getFileUploadProgress(4)).toEqual(0);
    service.removeUploadingFile('file4');
    expect(service.getFileUploadProgress(4)).toEqual(25);
    service.removeUploadingFile('file3');
    expect(service.getFileUploadProgress(4)).toEqual(50);
    service.removeUploadingFile('file2');
    expect(service.getFileUploadProgress(4)).toEqual(75);
    service.removeUploadingFile('file');
    expect(service.getFileUploadProgress(4)).toEqual(100);
    expect(service.areFilesUploaded()).toBeTruthy();
  });
});
