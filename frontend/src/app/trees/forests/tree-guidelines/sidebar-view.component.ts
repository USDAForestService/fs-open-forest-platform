import { Component, Input, HostListener, OnInit } from '@angular/core';
import { UtilService } from '../../../_services/util.service';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';

@Component({
  selector: 'app-sidebar-view',
  templateUrl: './sidebar-view.component.html'
})
export class SidebarViewComponent implements OnInit {
  @Input() forest: any;

  sidebarItems;

  constructor(public util: UtilService, public configService: SidebarConfigService) {}

  ngOnInit() {
    this.configService.getJSON().subscribe(data => {
      this.sidebarItems = data;
    });
  }
}
