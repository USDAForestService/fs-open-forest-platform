import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreesService } from '../../_services/trees.service';
import { UtilService } from '../../../_services/util.service';

@Component({
  selector: 'app-tree-info',
  templateUrl: './tree-guidelines.component.html'
})
export class TreeGuidelinesComponent implements OnInit {
  template: string;
  forest = [];
  errorMessage: string;
  id: any;
  showMobileNav = false;
  position: string;
  top: string;

  constructor(private route: ActivatedRoute, private service: TreesService, public util: UtilService) {}

  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth >= 951) {
      this.showMobileNav = false;
    }
  }

  @HostListener('document:scroll', ['$event'])
  public scroll(event: Event) {
    if (window.pageYOffset > 122) {
      this.position = 'fixed';
      this.top = '0px';
    } else {
      this.position = 'absolute';
      this.top = 'inherit';
    }
  }

  ngOnInit() {
    this.template = 'sidebar';
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.data.subscribe(data => {
      this.forest = data.forest;
    });
  }
}
