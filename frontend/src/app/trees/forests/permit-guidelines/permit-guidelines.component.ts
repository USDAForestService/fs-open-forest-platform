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
  templateUrl: './permit-guidelines.component.html'
})
export class PermitGuidelinesComponent implements OnInit {
  permitType: string;
  permitFriendlyText: string;
  template: string;
  forest: any = [];
  id: any;
  sidebarItems;
  isSeasonOpen = true;
  seasonOpenAlert = 'No online permits are available at this time,\
  please check the Season Dates for the type of permit you are interested in.';
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
a permit with the United States Forest Service on your National Forest with Open Forest.`
    });
  }

  /**
   *  @returns forest with season status and open alert
   */
  // todo: recieve in permitType as an parameter once we have season dates for something other than xmas trees
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
      this.permitType = data.permitType;
      this.user = data.user;
      this.forest = data.forest;

      // firewood permits
      if (this.permitType === 'firewood') {
        this.permitFriendlyText = 'Firewood';
        if (this.forest) {
          // todo: pass in permitType as an argument once we have season dates for something other than xmas trees
          this.forest = this.setSeasonStatus(this.forest);
          if (this.forest) {
            this.christmasTreesInfoService.updateMarkdownText(this.markdownService, this.forest);
          }

          this.titleService.setTitle(`${this.forest.forestName} | U.S. Forest Service Open Forest`);
          this.configService.getJSON('firewood').subscribe(configData => {
            this.sidebarItems = configData;
            if (!this.forest.isSeasonOpen) {
              this.sidebarItems = this.sidebarItems.filter(item => item.type !== 'button');
            }
          });
        }
      }

      // christmas tree permits
      if (this.permitType === 'trees') {
        this.permitFriendlyText = 'Christmas tree';
        if (this.forest) {
          // todo: pass in permitType as an argument once we have season dates for something other than xmas trees
          this.forest = this.setSeasonStatus(this.forest);
          if (this.forest) {
            this.christmasTreesInfoService.updateMarkdownText(this.markdownService, this.forest);
          }

          this.titleService.setTitle(`${this.forest.forestName} | U.S. Forest Service Open Forest`);
          this.configService.getJSON('trees').subscribe(configData => {
            this.sidebarItems = configData;
            if (!this.forest.isSeasonOpen) {
              this.sidebarItems = this.sidebarItems.filter(item => item.type !== 'button');
            }
          });
        }
      }

    });
  }
}
