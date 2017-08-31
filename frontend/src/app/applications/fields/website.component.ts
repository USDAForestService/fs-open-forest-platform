import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html'
})
export class WebsiteComponent {
  @Input() applicantInfo: FormGroup;
  @Output() blurWebsite: EventEmitter <any> = new EventEmitter();

  blurHandler (): void {
    // function to make blur event bubble up
    this.blurWebsite.emit();
  }
}
