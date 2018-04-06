import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { FileUploadService } from '../_services/file-upload.service';

@Component({
  selector: 'app-file-upload-field',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements DoCheck, OnInit {
  @Input() applicationId: number;
  @Input() name: string;
  @Input() type: string;
  @Input() uploadFiles: boolean;
  @Input() required: boolean;
  @Input() checkFileUploadHasError: boolean;
  @Input() field: FormControl;
  @Input() allowXls: boolean;

  allowedMimeType = [
    'application/msword',
    'application/pdf',
    'application/rtf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  errorMessage: string;
  maxFileSize = 25 * 1024 * 1024;
  uploader: FileUploader;

  constructor(public fieldsService: ApplicationFieldsService, public fileUploadService: FileUploadService) {
    this.uploader = new FileUploader({
      url: environment.apiUrl + 'permits/applications/special-uses/temp-outfitter/file',
      maxFileSize: this.maxFileSize,
      allowedMimeType: this.allowedMimeType,
      queueLimit: 2
    });
    this.uploader.onWhenAddingFileFailed = (item, filter, options) =>
      this.onWhenAddingFileFailed(item, filter, options);
    this.uploader.onAfterAddingFile = fileItem => this.onAfterAddingFile(this.uploader);
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) =>
      this.onCompleteItem(item, response, status, headers);
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) =>
      this.onErrorItem(item, response, status, headers);
  }

  onErrorItem(item, response, status, headers) {
    this.fileUploadService.setFileUploadError(true);
    item._onBeforeUpload();
  }

  onCompleteItem(item, response, status, headers) {
    this.fileUploadService.removeOneFile();
  }

  onAfterAddingFile(uploader) {
    if (uploader.queue.length > 0) {
      this.errorMessage = '';
      this.fileUploadService.addOneFile();
    }
    if (uploader.queue.length > 1) {
      uploader.removeFromQueue(uploader.queue[0]);
      this.fileUploadService.removeOneFile();
    }
    if (uploader.queue.length > 0) {
      this.field.patchValue(uploader.queue[0].file.name);
      this.field.markAsTouched();
      this.field.updateValueAndValidity();
      this.field.setErrors(null);
    }
  }

  onWhenAddingFileFailed(item: FileLikeObject, Filter: any, options: any) {
    if (this.uploader.queue.length > 0) {
      this.uploader.removeFromQueue(this.uploader.queue[0]);
    }
    switch (Filter.name) {
      case 'fileSize':
        this.errorMessage = `Maximum upload size exceeded (${item.size} of ${this.maxFileSize} allowed)`;
        break;
      case 'mimeType':
        const xls = this.allowXls ? '.xls, .xlsx, ' : '';
        this.errorMessage = `The file type you selected is not allowed. The allowed file types are .pdf, .doc, .docx, ${xls}or .rtf`;
        break;
      default:
        this.errorMessage = `Unknown error (filter is ${Filter.name})`;
    }

    this.field.markAsTouched();
    this.field.updateValueAndValidity();
    if (this.errorMessage) {
      this.field.setErrors({ error: this.errorMessage });
    }
  }

  ngOnInit() {
    if (this.allowXls) {
      this.allowedMimeType.push('application/vnd.ms-excel');
      this.allowedMimeType.push('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
  }

  clickInput(event) {
    event.preventDefault();
    document.getElementById(`${this.type}`).click();
  }

  ngDoCheck() {
    this.uploader.options.additionalParameter = { applicationId: this.applicationId, documentType: this.type };
    if (this.uploadFiles) {
      for (const item of this.uploader.queue) {
        item.upload();
      }
    }
    if (this.checkFileUploadHasError) {
      if (this.required && !this.uploader.queue[0] && !this.field.value) {
        this.errorMessage = `${this.name} is required.`;
      }
    }
  }
}
