import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UtilService } from '../_services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  @Input() items: any;
  @Input() mobileMenu = false;
  currentSection: any;
  bottom: string;
  top: string;
  position: string;
  showMobileNav = false;
  menuBtnTop: string;
  menuBtnPosition: string;
  route: string;

  constructor(public util: UtilService, private router: Router) {}

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

    if (window.pageYOffset > 122) {
      this.menuBtnPosition = 'fixed';
      this.menuBtnTop = '0px';
    } else {
      this.menuBtnPosition = 'absolute';
      this.menuBtnTop = '';
    }
  }

  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth >= 951) {
      this.showMobileNav = false;
    }
  }

  ngOnInit() {
    this.util.setCurrentSection('');
    this.top = '270px';
    console.log(this.router);
    this.route = this.router.url.split('#')[0];
  }
}
