import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-temporary-outfitters-faq',
  templateUrl: './temporary-outfitters-faq.component.html'
})
export class TemporaryOutfittersFaqComponent {
  constructor(private authentication: AuthenticationService) {}
}
