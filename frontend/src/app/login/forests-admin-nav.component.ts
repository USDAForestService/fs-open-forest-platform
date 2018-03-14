import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ChristmasTreesAdminService } from '../trees/admin/christmas-trees-admin.service';

@Component({
  selector: 'app-forests-admin-nav',
  templateUrl: './forests-admin-nav.component.html'
})
export class ForestAdminNavComponent implements OnInit {
  @Input() user: any;

  forestAdminNavItems = [];
  showAdminNav = true;
  showMobileNav = false;

  constructor(
    private adminService: ChristmasTreesAdminService
  ) {}

  ngOnInit() {
    this.forestAdminNavItems = this.adminService.getAdminNavItems();
  }
}
