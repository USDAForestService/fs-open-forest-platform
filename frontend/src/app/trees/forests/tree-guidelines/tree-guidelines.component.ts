import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../_services/util.service';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';

@Component({
  selector: 'app-tree-info',
  templateUrl: './tree-guidelines.component.html'
})
export class TreeGuidelinesComponent implements OnInit {
  template: string;
  forest: any = [];
  errorMessage: string;
  id: any;
  sidebarItems;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    public util: UtilService,
    public configService: SidebarConfigService
  ) {}

  ngOnInit() {
    this.template = 'sidebar';
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.data.subscribe(data => {
      this.forest = data.forest;
      if (this.forest) {
        this.titleService.setTitle(
          this.forest.forestName +
            ' National Forest Christmas tree permit information | U.S. Forest Service Christmas Tree Permitting'
        );
      }
    });

    this.configService.getJSON().subscribe(data => {
      this.sidebarItems = data;
    });
  }
}
