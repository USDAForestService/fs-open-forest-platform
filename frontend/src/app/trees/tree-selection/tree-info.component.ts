import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreesService } from '../_services/trees.service';

@Component({
  selector: 'app-tree-info',
  templateUrl: './tree-info.component.html'
})
export class TreeInfoComponent implements OnInit {
  template: string;
  forest: any;
  treeInfo: any;

  id: any;
  district: number;
  region: number;
  forestName: string;
  treeHeight: number; // feet
  stumpHeight: number; // inches
  stumpDiameter: number; // inches
  startDate: any;
  endDate: any;

  species: any; // array of species with identifier, description, status

  constructor(private route: ActivatedRoute, private service: TreesService) {}

  getTree(id) {
    this.forest = this.service.getOne(id).then(forest => (this.forest = forest));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.template = params['template'];
    });

    this.getTree(this.id);
    this.treeInfo = this.service.getTreeInfo();
  }
}
