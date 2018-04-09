import { Component, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-trees-buy-permit-bar',
  templateUrl: './buy-permit-bar.html'
})

export class BuyPermitBarComponent {
  @Input() forest: any;
  public top = '-100px';


  constructor(
      @Inject(DOCUMENT) public doc: Document,
    ) {}

  /**
   *  Set styles based on scroll position
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.forest.isSeasonOpen) {
      const buyPermitLinkPosition = this.doc.getElementById('static-buy-permit-link').getBoundingClientRect().top;
      // use -20 instead of 0 so user scrolls slightly past this button before the pay button bar appears
      if (buyPermitLinkPosition < -20) {
        this.top = '0px';
        this.doc.getElementById('mobile-menu-btn').classList.add('shadow');
      } else {
        this.top = '-100px';
        this.doc.getElementById('mobile-menu-btn').classList.remove('shadow');
      }
    }
  }
}
