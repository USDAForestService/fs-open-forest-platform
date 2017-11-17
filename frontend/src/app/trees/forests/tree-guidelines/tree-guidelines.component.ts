import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreesService } from '../../_services/trees.service';

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

  constructor(private route: ActivatedRoute, private service: TreesService) {}

  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth);
    if (event.target.innerWidth >= 951) {
      this.showMobileNav = false;
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
