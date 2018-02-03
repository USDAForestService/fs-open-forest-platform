import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../_services/util.service';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';
import * as moment from 'moment-timezone';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tree-info',
  templateUrl: './tree-guidelines.component.html',
  providers: [DatePipe]
})
export class TreeGuidelinesComponent implements OnInit {
  template: string;
  forest: any = [];
  id: any;
  sidebarItems;
  isSeasonOpen = true;
  seasonOpenAlert = 'Christmas tree season is closed and online permits are not available.';

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    public util: UtilService,
    public configService: SidebarConfigService,
    private datePipe: DatePipe
  ) {}

  setSeasonStatus(forest) {
    forest.isSeasonOpen = this.isSeasonOpen;
    forest.seasonOpenAlert = this.seasonOpenAlert;

    if (forest.endDate && forest.startDate) {
      forest.isSeasonOpen = moment(forest.endDate).isAfter(moment().tz(forest.timezone));
      if (forest.isSeasonOpen && moment(forest.startDate).isAfter(moment().tz(forest.timezone))) {
        forest.isSeasonOpen = false;

        forest.seasonOpenAlert = `Online permits become available for purchase on ${moment(forest.startDate).format(
          'MMM. D, YYYY'
        )}.`;
      }
    }
    return forest;
  }

  ngOnInit() {
    this.template = 'sidebar';
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.data.subscribe(data => {
      this.forest = data.forest;
      if (this.forest) {
        this.forest = this.setSeasonStatus(this.forest);
        this.titleService.setTitle(this.forest.forestName + ' | U.S. Forest Service Christmas Tree Permitting');
        this.configService.getJSON().subscribe(configData => {
          this.sidebarItems = configData;
          if (!this.forest.isSeasonOpen) {
            this.sidebarItems = this.sidebarItems.filter(item => item.type !== 'button');
          }
        });
      }
    });
  }
}
