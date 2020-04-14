import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { NgxMdService } from 'ngx-md';
import { ChristmasTreesInfoService } from '../../trees/_services/christmas-trees-info.service';

@Component({
  selector: 'app-forest-template',
  templateUrl: './forest-template.component.html',
})
export class ForestTemplateComponent implements OnInit {
  template: string;
  forest: any = [];
  id: any;
  isSeasonOpen = true;
  seasonOpenAlert = 'Christmas tree season is closed and online permits are not available.';
  user;
  bgImg;
  specialUse: boolean;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private christmasTreesInfoService: ChristmasTreesInfoService,
    public markdownService: NgxMdService,
    private meta: Meta,
    public renderer: Renderer2
  ) {
    this.meta.addTag({
      name: 'description', content: `Learn more about how to purchase\
permits with the United States Forest Service on your National Forest with Open Forest.`
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
          console.log(this.forest);
        }
        if(this.forest.forestAbbr == 'mbs'){
          this.specialUse = true;
        }
        this.titleService.setTitle(`${this.forest.forestName} | U.S. Forest Service Open Forest`);
        this.bgImg = './assets/img/forests/' + this.forest.forestAbbr + '.jpg';
      }
    });
  }
}