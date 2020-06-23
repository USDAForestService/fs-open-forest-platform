import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';
import * as moment from 'moment-timezone';
import { environment } from '../../../../environments/environment';
import { NgxMdService } from 'ngx-md';
import { FirewoodInfoService } from '../../_services/firewood-info.service';

@Component({
  selector: 'app-firewood-info',
  templateUrl: './firewood-guidelines.component.html'
})
export class FirewoodGuidelinesComponent implements OnInit {
  template: string;
  forest: any = [];
  id: any;
  sidebarItems;
  isSeasonOpen = true;
  seasonOpenAlert = 'Firewood season is closed and online permits are not available.';
  user;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private firewoodInfoService: FirewoodInfoService,
    private configService: SidebarConfigService,
    public markdownService: NgxMdService,
    private meta: Meta,
    public renderer: Renderer2
  ) {
    this.meta.addTag({
      name: 'description', content: `Learn more about how to purchase\
a Firewood permit with the United States Forest Service on your National Forest with Open Forest.`
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
        // this.forest = this.setSeasonStatus(this.forest);
        // if (this.forest) {
        //   this.firewoodInfoService.updateMarkdownText(this.markdownService, this.forest);
        // }

        this.titleService.setTitle(`${this.forest.forestName} | U.S. Forest Service Open Forest`);
        this.configService.getJSON('firewood').subscribe(configData => {
          this.sidebarItems = configData;
          // if (!this.forest.isSeasonOpen) {
          //   this.sidebarItems = this.sidebarItems.filter(item => item.type !== 'button');
          // }
        });
      }
    });
  }
}
