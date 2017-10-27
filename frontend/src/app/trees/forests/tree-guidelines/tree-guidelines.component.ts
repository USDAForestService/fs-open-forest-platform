import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private service: TreesService) {}

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
