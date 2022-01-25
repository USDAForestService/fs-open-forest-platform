import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';
import * as moment from 'moment-timezone';
import { environment } from '../../../../environments/environment';
import { NgxMdService } from 'ngx-md';
import { ChristmasTreesInfoService } from '../../_services/christmas-trees-info.service';

@Component({
  selector: 'app-tree-info',
  templateUrl: './tree-guidelines.component.html'
})
export class TreeGuidelinesComponent implements OnInit {
  template: string;
  forest: any = [];
  id: any;
  sidebarItems;
  isSeasonOpen = true;
  seasonOpenAlert = 'Christmas tree season is closed and online permits are not available.';
  user;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private christmasTreesInfoService: ChristmasTreesInfoService,
    private configService: SidebarConfigService,
    public markdownService: NgxMdService,
    private meta: Meta,
    public renderer: Renderer2
  ) {
    this.meta.addTag({
      name: 'description', content: `Learn more about how to purchase\
a Christmas tree permit with the United States Forest Service on your National Forest with Digital Permits.`
    });
  }

  /**
   *  @returns forest with season status and open alert
   */
  setSeasonStatus(forest) {
    forest.isSeasonOpen = this.isSeasonOpen;
    forest.seasonOpenAlert = this.seasonOpenAlert;
    if (forest.endDate && forest.startDate) {
      forest.isSeasonOpen = moment(forest.endDate)
        .isSameOrAfter(moment().startOf('day').toString());

      if (forest.isSeasonOpen) {
        forest.seasonOpenAlert = '';
        forest = this.checkSeasonStartDate(forest);
      }
    }
    return forest;
  }

  /**
   *  @returns forest with isSeasonOpen and seasonOpenAlert set.
   */
  private checkSeasonStartDate(forest) {
    if (
      moment(forest.startDate)
        .isAfter(moment())
    ) {
      forest.isSeasonOpen = false;
      forest.seasonOpenAlert = `Online permits become available for purchase on ${moment(forest.startDate).format(
        'MMM D, YYYY'
      )}.`;
    }
    return forest;
  }

  /**
   *  @returns set forest data from route resolver
   */
  ngOnInit() {
    this.template = 'sidebar';
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.data.subscribe(data => {
      this.user = data.user;
      this.forest = data.forest;
      if (this.forest) {
        this.forest = this.setSeasonStatus(this.forest);
        if (this.forest) {
          this.christmasTreesInfoService.updateMarkdownText(this.markdownService, this.forest);
        }

        this.titleService.setTitle(`${this.forest.forestName} | U.S. Forest Service Digital Permits`);
        this.configService.getJSON('trees').subscribe(configData => {
          this.sidebarItems = configData;
          if (!this.forest.isSeasonOpen) {
            this.sidebarItems = this.sidebarItems.filter(item => item.type !== 'button');
          }
        });
      }
    });
  }
}
