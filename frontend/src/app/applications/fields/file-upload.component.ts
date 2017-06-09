import { Component, Input, OnChanges } from '@angular/core';
import { FileSelectDirective, FileUploader, FileLikeObject, FileItem } from '../../../../node_modules/ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-file-upload-field',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnChanges {
  uploader: FileUploader;
  @Input() name: string;
  @Input() uploadFiles: boolean;

  errorMessage: string;
  maxFileSize = 1024 * 1024;
  allowedMimeType = ['image/jpeg', 'image/png', 'application/pdf'];

  constructor() {
    this.uploader = new FileUploader({
      url: environment.apiUrl + 'permits/applications/special-uses/temp-outfitters/file',
      maxFileSize: this.maxFileSize,
      allowedMimeType: this.allowedMimeType,
      queueLimit: 2

    });
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
    this.uploader.onAfterAddingFile = (fileItem) => this.onAfterAddingFile(this.uploader);
  }

  onAfterAddingFile(uploader) {
    if (uploader.queue.length > 0) {
      this.errorMessage = '';
    }
    if (uploader.queue.length > 1) {
      uploader.removeFromQueue(uploader.queue[0]);
    }
  }

  onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any) {
    switch (filter.name) {
        case 'fileSize':
            this.errorMessage = `Maximum upload size exceeded (${item.size} of ${this.maxFileSize} allowed)`;
            break;
        case 'mimeType':
            const allowedTypes = this.allowedMimeType.join();
            this.errorMessage = `The file type "${item.type} is not allowed. The allowed file types are "${allowedTypes}"`;
            break;
        default:
            this.errorMessage = `Unknown error (filter is ${filter.name})`;
    }
  }

  ngOnChanges() {
    if (this.uploadFiles) {
      this.uploader.uploadAll();
    }
  }
}
