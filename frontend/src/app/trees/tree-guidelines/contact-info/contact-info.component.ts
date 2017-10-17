import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-contact-info',
  templateUrl: './contact-info.component.html'
})
export class ContactInfoComponent {
  @Input() forest: any;
}
