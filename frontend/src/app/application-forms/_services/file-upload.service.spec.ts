import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { FormBuilder } from '@angular/forms';

describe('FileUploadService', () => {
  let service: FileUploadService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    service = new FileUploadService();
    formBuilder = new FormBuilder();
    TestBed.configureTestingModule({
      providers: [FileUploadService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should set number of files', () => {
    service.setNumberOfFiles(3);
    expect(service.numberOfFiles).toEqual(3);
  });

  it('should set file upload error', () => {
    service.setFileUploadError(true);
    expect(service.fileUploadError).toBeTruthy();
  });
});
