import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  user: any;
  constructor(private authentication: AuthenticationService) {}

  ngOnInit() {
    this.user = this.authentication.getUser();
  }
}
