import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreesService } from '../_services/trees.service';

@Component({
  selector: 'app-tree-info',
  templateUrl: './tree-info.component.html'
})
export class TreeInfoComponent implements OnInit {
  template: string;
  id: any;
  treeHeight: number; //feet
  stumpHeight: number; //inches
  stumpDiameter: number; //inches
  species: any; // array of species with identifier, description, status
  tree: any;

  constructor(private route: ActivatedRoute, private service: TreesService) {}

  getTree(id) {
    this.tree = this.service.getOne(id).then(tree => (this.tree = tree));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.template = params['template'];
    });

    this.getTree(this.id);
  }
}
