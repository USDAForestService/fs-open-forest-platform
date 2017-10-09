import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-revision-history',
  templateUrl: './revision-history.component.html'
})
export class RevisionHistoryComponent {
  @Input() revisions: any;
}
