import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UtilService } from '../_services/util.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  @Input() items: any;
  currentSection: any;
  bottom: string;
  top: string;
  position: string;

  constructor(private util: UtilService) {}

  @HostListener('document:scroll', ['$event'])
  public track(event: Event) {
    const nav = document.getElementById('sidebar-nav');
    const container = document.getElementById('sidebar-page');
    const footer = document.getElementById('footer');

    if (nav) {
      if (container.getBoundingClientRect().top < 20) {
        this.top = '40px';
        this.bottom = 'auto';
        this.position = 'fixed';
      } else {
        this.top = '250px';
        this.position = 'absolute';
      }

      if (window.innerHeight < 720 && footer.getBoundingClientRect().top < 480) {
        const bottom = -Math.abs(footer.getBoundingClientRect().top) + 840;
        this.top = '-250px';
        this.position = 'fixed';
      }
    }
  }

  gotoHashtag(fragment: string, event) {
    this.util.gotoHashtag(fragment, event, this.currentSection);
  }

  ngOnInit() {}
}
