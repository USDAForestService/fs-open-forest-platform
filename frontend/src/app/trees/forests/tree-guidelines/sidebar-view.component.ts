import { Component, Input, HostListener, OnInit } from '@angular/core';
import { UtilService } from '../../../_services/util.service';

@Component({
  selector: 'app-sidebar-view',
  templateUrl: './sidebar-view.component.html'
})
export class SidebarViewComponent implements OnInit {
  @Input() forest: any;

  bottom: string;
  top: string;
  position: string;

  constructor(public util: UtilService) {}

  @HostListener('document:scroll', ['$event'])
  public track(event: Event) {
    const nav = document.getElementById('sidebar-nav');
    const container = document.getElementById('sidebar-page');
    const footer = document.getElementById('footer');

    if (nav) {
      if (container.getBoundingClientRect().top < 30) {
        this.top = '140px';
        this.bottom = 'auto';
        this.position = 'fixed';
      } else {
        this.top = '270px';
        this.position = 'absolute';
      }

      if (window.innerHeight < 720 && footer.getBoundingClientRect().top < 480) {
        const bottom = -Math.abs(footer.getBoundingClientRect().top) + 840;
        this.top = '-10px';
        this.position = 'fixed';
      }
    }
  }

  ngOnInit() {
    this.top = '270px';
  }
}
