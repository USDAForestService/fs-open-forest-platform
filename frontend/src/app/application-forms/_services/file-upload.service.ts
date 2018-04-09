import { Injectable } from '@angular/core';

@Injectable()
export class FileUploadService {
  numberOfFiles: any = 0;
  fileUploadError = false;

  getNumberOfFiles() {
    return this.numberOfFiles;
  }

  setNumberOfFiles(num) {
    this.numberOfFiles = num;
  }

  removeOneFile() {
    this.numberOfFiles--;
  }

  addOneFile() {
    this.numberOfFiles++;
  }

  getFileUploadProgress(startingNumberOfFiles) {
    const filesRemaining = this.numberOfFiles;
    return startingNumberOfFiles - filesRemaining;
  }

  setFileUploadError(value: boolean) {
    this.fileUploadError = value;
  }
}
