import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-forests-admin-nav',
  templateUrl: './forests-admin-nav.component.html'
})
export class ForestAdminNavComponent implements OnInit {
  user;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.getAuthenticatedUser().subscribe((user) => { this.user = user});
  }
}
