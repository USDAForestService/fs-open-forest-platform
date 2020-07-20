import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FileLikeObject, FileUploader, FileItem } from 'ng2-file-upload';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { FileUploadService } from '../_services/file-upload.service';
import { Button } from 'protractor';

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
  @Input() allowImg: boolean;

  allowedMimeType = [
    'application/pdf'
  ];
  errorMessage: string;
  maxFileSize = 10 * 1024 * 1024;
  uploader: FileUploader;
  status: any;
  index: null;
  deletedFile: FileItem;
  wasFileDeleted: boolean;
  checkForBlur: boolean;
  checkForFocus: boolean;

  constructor(public fieldsService: ApplicationFieldsService, public fileUploadService: FileUploadService) {
    this.uploader = new FileUploader({
      url: environment.apiUrl + 'permits/applications/special-uses/temp-outfitter/file',
      maxFileSize: this.maxFileSize,
      allowedMimeType: this.allowedMimeType,
    });
    this.uploader.onWhenAddingFileFailed = (item, filter, options) =>
      this.onWhenAddingFileFailed(item, filter, options);
    this.uploader.onAfterAddingFile = fileItem => this.onAfterAddingFile(this.uploader);
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) =>
      this.onCompleteItem(item, response, status, headers);
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) =>
      this.onErrorItem(item, response, status, headers);
      this.wasFileDeleted = false;
  }

  onErrorItem(item, response, status, headers) {
    this.fileUploadService.setFileUploadError(true);
    item._onBeforeUpload();
  }

  onCompleteItem(item, response, status, headers) {
    this.fileUploadService.removeOneFile();
  }

  onAfterAddingFile(uploader) {
        this.field.markAsTouched();
        this.field.updateValueAndValidity();
        this.errorMessage = '';
        this.field.setErrors(null);
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
        const img = this.allowImg ? '.jpg, .png, ' : '.doc, .docx, .rtf, ';
        this.errorMessage = `The file type you selected is not allowed. The allowed file types are ${img}${xls}or .pdf`;
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
    if (this.allowImg) {
      this.allowedMimeType.push('image/jpeg');
      this.allowedMimeType.push('image/png');
    } else {
      this.allowedMimeType.push('application/msword');
      this.allowedMimeType.push('application/rtf');
      this.allowedMimeType.push('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    }
    if (this.allowXls) {
      this.allowedMimeType.push('application/vnd.ms-excel');
      this.allowedMimeType.push('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
  }

  onElementInViewport(entries, observer) {
      console.log('This was focused');
  }

  // onBlurMethod(){
  //   if (this.checkForBlur === true){
  //     console.log('This was blurred');
  //     let options = {
  //       root: document.querySelector('usa-file-input'),
  //       rootMargin: '0px',
  //       threshold: 1.0      };
  //     let observer = new IntersectionObserver(this.onElementInViewport(options, observer), options);
  //     observer.observe(document.getElementById(`${this.type}-choose-file`));
  //   }
  // }

  FileUploadDeleteHandler(event, status, index) {
    event.preventDefault();
    // let deletedFile = null;
    const that = this;
    let bool = false;

    switch (status) {
      case 'Upload':
        // if (this.wasFileDeleted === true) {
        //   this.uploader.queue[0] = this.deletedFile;
        //   this.deletedFile = null;
        //   this.wasFileDeleted = false;
        //   this.FileUploadDeleteHandler(event, 'Upload', 1);
        // } else {
          document.getElementById(`${this.type}`).click();
        //   this.uploader.onAfterAddingFile = function (fileItem) {
        //     if (that.uploader.queue.length > 1) {
        //       bool = false;
        //       that.uploader.removeFromQueue(that.uploader.queue[0]);
        //     }
        //     else if (bool === true) {
        //       bool = false;
        //       that.wasFileDeleted = true;
        //       that.deletedFile = that.uploader.queue[0];
        //       that.uploader.removeFromQueue(that.uploader.queue[0]);
        //       console.log(that.deletedFile.file.name);
        //     }
        //   };
        // }
        this.field.patchValue(this.uploader.queue[index]);
        this.fileUploadService.addOneFile();
        break;
      case 'Replace':
        let fileAlreadyExists = false;
        const originalFileItem = this.uploader.queue[index];
        if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[index]);
        document.getElementById(`${this.type}`).click();
          this.uploader.onAfterAddingFile = function (fileItem) {
            for (let i = 0; i < that.uploader.queue.length - 1; i++) {
              if (that.uploader.queue[i].file.name === fileItem.file.name) {
                fileAlreadyExists = true;
              }
            }
            if (fileAlreadyExists) {
              that.uploader.queue[index] = originalFileItem;
            }
          };
        } else {
          document.getElementById(`${this.type}`).click();
          this.uploader.onAfterAddingFile = function (fileItem) {
            if (that.uploader.queue.length > 1) {
              that.uploader.removeFromQueue(that.uploader.queue[0]);
            }
          };
        }
        this.field.patchValue(this.uploader.queue[index]);
        this.onAfterAddingFile(this.uploader);
        break;
      case 'Delete':
        if (this.uploader.queue.length > 1) {
          this.uploader.removeFromQueue(this.uploader.queue[index]);
        } else {
          this.checkForBlur = true;
          this.wasFileDeleted = true;
          this.deletedFile = this.uploader.queue[index];
          this.uploader.removeFromQueue(this.uploader.queue[index]);
          console.log(this.deletedFile.file.name);
        }
        this.fileUploadService.removeOneFile();
        this.onAfterAddingFile(this.uploader);
        break;
    }
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
