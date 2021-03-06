import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { UtilService } from '../_services/util.service';
import { Router } from '@angular/router';
import { ChristmasTreesAdminService } from '../trees/admin/christmas-trees-admin.service';
import { FirewoodAdminService } from '../firewood/admin/firewood-admin.service';
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
  @Input() permitType;

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
    private treesAdminService: ChristmasTreesAdminService,
    private firewoodAdminService: FirewoodAdminService,
    private winRef: WindowRef
  ) {}

  /**
   * Track scroll position
   */
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

  /**
   * Set top, botton, and position styles based on sidebar's relation to the header
   */
  private sidebarHeaderIntersection(container, header) {
    if (container.getBoundingClientRect().top < this.items.length - 120) {
      this.top = '80px';
      this.bottom = 'auto';
      this.position = 'fixed';
    } else {
      this.top = '0px';
      this.position = 'absolute';
    }
  }

  /**
   * Set top and position styles based on sidebar's relation to the footer
   */
  private sidebarFooterIntersection(footer) {
    if (footer.getBoundingClientRect().top < this.items.length * 80) {
      // sidebar bottom hits top of footer
      this.top = this.items.length * -1 + 'px';
      this.position = 'fixed';
    }
  }

  /**
   * Set Menu position and top styles based on page scroll position.
   */
  private pageYOffset() {
    if (this.winRef.getNativeWindow().pageYOffset > this.items.length * 16) {
      this.menuBtnPosition = 'fixed';
      this.menuBtnTop = '0px';
    } else {
      this.menuBtnPosition = 'absolute';
      this.menuBtnTop = '';
    }
  }

  /**
   * Hide/show mobile nav
   */
  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  /**
   * Listen to window resize event and hide mobile nav is window is wider than 950px
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth >= 951) {
      this.showMobileNav = false;
    }
  }

  /**
   * Get admin nav items
   * Set default currentSection
   * Set default styles
   */
  ngOnInit() {
    this.route = this.router.url.split('#')[0];
    if (this.permitType === 'trees') {
      this.forestAdminNavItems = this.treesAdminService.getAdminNavItems(this.user);
    }
    if (this.permitType === 'firewood') {
      this.forestAdminNavItems = this.firewoodAdminService.getAdminNavItems(this.user);
    }
    this.util.setCurrentSection('');
    this.top = '0px';
    this.track(new Event('scroll'));
  }
}
