import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  templateUrl: './footer.component.html'
})
export class PageFooterComponent {
  @Input() version: string;
  @Input() buildDate: string;

}
