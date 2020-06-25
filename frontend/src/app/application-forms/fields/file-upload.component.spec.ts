import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FileUploadComponent } from './file-upload.component';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { FileUploadService } from '../_services/file-upload.service';

import { FileLikeObject, FileUploadModule } from 'ng2-file-upload';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [FileUploadModule],
        declarations: [FileUploadComponent],
        providers: [FormBuilder, ApplicationFieldsService, FileUploadService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.debugElement.componentInstance;
    component.field = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove a file when upload is complete', () => {
    component.fileUploadService.numberOfFiles = 2;
    component.onCompleteItem(null, null, null, null);
    expect(component.fileUploadService.numberOfFiles).toEqual(1);
  });

  it('should update field after file is added', () => {
    component.fileUploadService.numberOfFiles = 0;
    let uploader = { queue: [] };
    uploader = { queue: [{ file: { name: 'test' } }] };
    component.clickInput(Event, 'Upload', 0);
    expect(component.errorMessage).toEqual('');
    expect(component.fileUploadService.numberOfFiles).toEqual(1);
    // expect(component.field.value).toEqual('test');

    uploader = { queue: [{ file: { name: 'test_2' } }] };
    component.clickInput(Event, 'Replace', 0);
    expect(component.errorMessage).toEqual('');
    expect(component.fileUploadService.numberOfFiles).toEqual(1);
    // expect(component.field.value).toEqual('test_2');

    uploader = { queue: [{ file: { name: 'test_3' } }] };
    component.clickInput(Event, 'Upload', 1);
    expect(component.errorMessage).toEqual('');
    expect(component.fileUploadService.numberOfFiles).toEqual(2);
    // expect(component.field.value).toEqual('test_3');

    component.clickInput(Event, 'Delete', 1);
    expect(component.errorMessage).toEqual('');
    expect(component.fileUploadService.numberOfFiles).toEqual(1);
    // expect(component.field.value).toEqual('test_2');
  });

  it('should give an error when file fails to add to queue', () => {
    const some = File;
    let filter = { name: 'fileSize' };
    const uploader = { queue: [] };
    const file = new FileLikeObject(some);
    file.size = 2000;
    component.onWhenAddingFileFailed(file, filter, null);
    expect(component.errorMessage).toEqual(`Maximum upload size exceeded (2000 of 10485760 allowed)`);
    filter = { name: 'mimeType' };
    component.onWhenAddingFileFailed(file, filter, null);
    expect(component.errorMessage).toEqual(
      `The file type you selected is not allowed. The allowed file types are .doc, .docx, .rtf, or .pdf`
    );
    component.allowImg = true;
    component.onWhenAddingFileFailed(file, filter, null);
    expect(component.errorMessage).toEqual(
      `The file type you selected is not allowed. The allowed file types are .jpg, .png, or .pdf`
    );
    component.allowImg = false;
    component.allowXls = true;
    component.onWhenAddingFileFailed(file, filter, null);
    expect(component.errorMessage).toEqual(
      `The file type you selected is not allowed. The allowed file types are .doc, .docx, .rtf, .xls, .xlsx, or .pdf`
    );
    filter = { name: 'test filter' };
    component.onWhenAddingFileFailed(file, filter, null);
    expect(component.errorMessage).toEqual(`Unknown error (filter is test filter)`);

    component.ngOnInit();
    expect(component.allowedMimeType.indexOf('application/vnd.ms-excel')).toBeTruthy();
    expect(
      component.allowedMimeType.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ).toBeTruthy();
  });
});
