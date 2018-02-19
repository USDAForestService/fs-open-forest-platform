import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../_services/util.service';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';
import * as moment from 'moment-timezone';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { MarkdownService } from 'ngx-md';

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
    private datePipe: DatePipe,
    public markdownService: MarkdownService
  ) {}

  setSeasonStatus(forest) {
    forest.isSeasonOpen = this.isSeasonOpen;
    forest.seasonOpenAlert = this.seasonOpenAlert;

    if (forest.endDate && forest.startDate) {
      forest.isSeasonOpen = moment(forest.endDate)
        .tz(forest.timezone)
        .isAfter(moment().tz(forest.timezone));
      if (forest.isSeasonOpen) {
        forest.seasonOpenAlert = '';
        forest = this.checkSeasonStartDate(forest);
      }
    }

    forest = this.setMockAlert(forest);

    return forest;
  }

  private setMockAlert(forest) {
    // set mock data info warning if on test environment
    if (!environment.production) {
      forest.isMockData = true;
      forest.mockDataAlert = ' Note: Forest season dates are mocked for testing purposes.';
    }
    return forest;
  }

  private checkSeasonStartDate(forest) {
    if (moment(forest.startDate)
        .tz(forest.timezone)
        .isAfter(moment().tz(forest.timezone))
    ) {
      forest.isSeasonOpen = false;
      forest.seasonOpenAlert = `Online permits become available for purchase on ${moment(forest.startDate).format(
        'MMM. D, YYYY'
      )}.`;
    }
    return forest;
  }

  formatCuttingAreaDate(startDate, endDate) {
    const start = moment(startDate).tz(this.forest.timezone);
    const end = moment(endDate).tz(this.forest.timezone);
    const startFormat = 'MMM. D -';
    let endFormat = ' D, YYYY';

    if (start.month() !== end.month()) {
      endFormat = ' MMM. D, YYYY';
    }
    return start.format(startFormat) + end.format(endFormat);
  }

  formatCuttingAreaTime(startDate, endDate) {
    const start = moment(startDate).tz(this.forest.timezone).format('h:mm a - ');
    return start + moment(endDate).tz(this.forest.timezone).format('h:mm a.');
  }

  updateMarkdownText() {
    this.markdownService.renderer.text = (text: string) => {
      const replaceArray = Object.keys(this.forest);
      if (text.indexOf('{{') > -1) {
        for (let i = 0; i < replaceArray.length; i++) {
          text = text.replace(new RegExp('{{' + replaceArray[i] + '}}', 'gi'), this.forest[replaceArray[i]]);
        }
      }

      const cuttingAreaKeys = ['ELKCREEK', 'REDFEATHERLAKES', 'SULPHUR', 'CANYONLAKES'];
      for (const key of cuttingAreaKeys) {
        if (text.indexOf(key) > -1) {
          text = text
            .replace(key + 'DATE', this.formatCuttingAreaDate(this.forest.cuttingAreas[key].startDate, this.forest.cuttingAreas[key].endDate))
            .replace(key + 'TIME', this.formatCuttingAreaTime(this.forest.cuttingAreas[key].startDate, this.forest.cuttingAreas[key].endDate));
        }
      }
      return text;
    };

    this.markdownService.renderer.heading = (text, level) => {
      return `<h${level}>${text}</h${level}>`;
    };
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

        this.updateMarkdownText();

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
