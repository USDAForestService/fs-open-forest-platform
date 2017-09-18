import { Component, Input } from '@angular/core';

@Component({
  providers: [],
  selector: 'app-noncommercial-details',
  templateUrl: './noncommercial-details.component.html'
})
export class NoncommercialDetailsComponent {
  @Input() application: any;
}
