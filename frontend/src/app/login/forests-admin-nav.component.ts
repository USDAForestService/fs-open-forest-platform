import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ChristmasTreesAdminService } from '../trees/admin/christmas-trees-admin.service';

@Component({
  selector: 'app-forests-admin-nav',
  templateUrl: './forests-admin-nav.component.html'
})
export class ForestAdminNavComponent implements OnInit {
  user;
  forestAdminNavItems = [];

  constructor(
    private authenticationService: AuthenticationService,
    private adminService: ChristmasTreesAdminService
  ) {}

  ngOnInit() {
    this.authenticationService.getAuthenticatedUser().subscribe((user) => { this.user = user; });
    this.forestAdminNavItems = this.adminService.getAdminNavItems();
  }
}
