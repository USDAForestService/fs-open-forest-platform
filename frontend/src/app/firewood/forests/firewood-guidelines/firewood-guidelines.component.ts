import { Title, Meta } from '@angular/platform-browser';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarConfigService } from '../../../sidebar/sidebar-config.service';
import * as moment from 'moment-timezone';
import { environment } from '../../../../environments/environment';
import { FirewoodInfoService } from '../../_services/firewood-info.service';
import { FirewoodApplicationService } from '../../_services/firewood-application.service';
import { WindowRef } from '../../../_services/native-window.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-firewood-info',
  templateUrl: './firewood-guidelines.component.html'
})
export class FirewoodGuidelinesComponent implements OnInit {
  template: string;
  forest: any = [];
  id: any;
  nativeWindow: any;
  sidebarItems;
  isSeasonOpen = true;
  seasonOpenAlert = 'Firewood season is closed and online permits are not available.';
  user;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private firewoodInfoService: FirewoodInfoService,
    private firewoodApplicationService: FirewoodApplicationService,
    private configService: SidebarConfigService,
    private meta: Meta,
    public renderer: Renderer2,
    private winRef: WindowRef,
    @Inject(DOCUMENT) private document: any
  ) {
    this.nativeWindow = winRef.getNativeWindow();
    this.meta.addTag({
      name: 'description',
      content: `Learn more about how to purchase a Firewood permit with the\
       United States Forest Service on your National Forest with Digital Permits.`
    });

  }

  minCost() {
    return this.forest.woodCost * this.forest.minCords;
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
        this.titleService.setTitle(`${this.forest.forestName} | U.S. Forest Service Digital Permits`);
        this.configService.getJSON('firewood').subscribe(configData => {
          this.sidebarItems = configData;
        });
      }
    });
  }
}
