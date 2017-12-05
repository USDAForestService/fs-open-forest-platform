import { Title } from '@angular/platform-browser';
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

  constructor(private route: ActivatedRoute, private titleService: Title, private service: TreesService, public util: UtilService) {}

  ngOnInit() {
    this.template = 'sidebar';
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.data.subscribe(data => {
      this.forest = data.forest;
      if (data.forest) {
        this.titleService.setTitle(data.forest.forestName + ' National Forest Christmas tree permit information | U.S. Forest Service Christmas Tree Permitting');
      }
    });
  }
}
