import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html'
})
export class ProgressComponent {
  @Input() numberOfFiles: number;
  @Input() fileUploadProgress: number;
}
