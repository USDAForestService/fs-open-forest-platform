import { Component, Input, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-view',
  templateUrl: './sidebar-view.component.html'
})
export class SidebarViewComponent implements OnInit {
  @Input() forest: any;

  currentSection: any;
  bottom: string;
  top: string;
  position: string;

  @HostListener('document:scroll', ['$event'])
  public track(event: Event) {
    const nav = document.getElementById('sidebar-nav');
    const container = document.getElementById('sidebar-page');
    const footer = document.getElementById('footer');

    if (nav) {
      if (container.getBoundingClientRect().top < 20) {
        this.top = '80px';
        this.bottom = 'auto';
        this.position = 'fixed';
      } else {
        this.top = '330px';
        this.position = 'absolute';
      }

      if (window.innerHeight < 720 && footer.getBoundingClientRect().top < 480) {
        const bottom = -Math.abs(footer.getBoundingClientRect().top) + 840;
        this.top = '-150px';
        this.position = 'fixed';
      }
    }
  }

  gotoHashtag(fragment: string, event) {
    event.preventDefault();
    const element = document.querySelector('#' + fragment);
    if (element) {
      element.scrollIntoView();
      document.getElementById(fragment).focus();
      this.currentSection = fragment;
    }
  }

  ngOnInit() {
    this.currentSection = 'general-guidelines';
  }
}
