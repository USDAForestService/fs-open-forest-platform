import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-temporary-outfitters-faq',
  templateUrl: './temporary-outfitters-faq.component.html'
})
export class TemporaryOutfittersFaqComponent implements OnInit {
  user: any;
  constructor(private authentication: AuthenticationService) {}

  ngOnInit() {
    this.user = this.authentication.getUser();
  }
}
