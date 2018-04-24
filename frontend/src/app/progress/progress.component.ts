import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html'
})
export class ProgressComponent {
  @Input() numberOfFiles: number;
  @Input() fileUploadProgress: number;
  @Input() fileUploadError: boolean;
  @Input() message: string;
  @Output() retryFileUpload: EventEmitter<any> = new EventEmitter<any>();

  retry() {
    this.retryFileUpload.emit();
  }
}
