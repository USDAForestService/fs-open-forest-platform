import { Component, OnInit, Input, HostListener, Inject } from '@angular/core';
import { UtilService } from '../_services/util.service';
import { Router } from '@angular/router';
import { ChristmasTreesAdminService } from '../trees/admin/christmas-trees-admin.service';
import { WindowRef } from '../_services/native-window.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  @Input() items: any;
  @Input() mobileMenu = false;
  @Input() user;

  top: string;
  bottom: string;
  position: string;
  showMobileNav = false;
  menuBtnTop: string;
  menuBtnPosition: string;
  route: string;
  forestAdminNavItems = [];
  showAdminNav = false;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public util: UtilService,
    private router: Router,
    private adminService: ChristmasTreesAdminService,
    private winRef: WindowRef
  ) {}

  @HostListener('document:scroll', ['$event'])
  public track(event: Event) {
    const nav = this.doc.getElementById('sidebar-nav');
    const container = this.doc.getElementById('sidebar-page');
    const footer = this.doc.getElementById('footer');
    const header = this.doc.getElementById('header');

    if (nav && this.items && this.items.length > 0) {
      this.sidebarHeaderIntersection(container, header);
      this.sidebarFooterIntersection(footer);
      this.pageYOffset();
    }
  }

  private sidebarHeaderIntersection(container, header) {
    if (container.getBoundingClientRect().top < this.items.length * 4.3) {
      this.top = header.getBoundingClientRect().height - 40 + 'px'; // distance from top of page to start of sidebar without header
      this.bottom = 'auto';
      this.position = 'fixed';
    } else {
      this.top = header.getBoundingClientRect().height + 100 + 'px'; // distance from top of page to start of sidebar with header
      this.position = 'absolute';
    }
  }

  private sidebarFooterIntersection(footer) {
    if (footer.getBoundingClientRect().top < this.items.length * 60) {
      // sidebar bottom hits top of footer
      const bottom = -Math.abs(footer.getBoundingClientRect().top) + this.items.length * 2.5;
      this.top = this.items.length * -9 + 'px';
      this.position = 'fixed';
    }
  }

  private pageYOffset() {
    if (this.winRef.getNativeWindow().pageYOffset > this.items.length * 16) {
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
    this.forestAdminNavItems = this.adminService.getAdminNavItems();
    this.util.setCurrentSection('');
    this.top = '325px';
    this.route = this.router.url.split('#')[0];
  }
}
