import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreesService } from '../_services/trees.service';

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

  getForest(id) {
    this.service.getOne(id).subscribe(
      result => {
        result.forest.species.sort((a, b) => {
          a.status > b.status;
        });
        this.forest = result.forest;
      },
      (e: any) => {
        this.errorMessage = 'The application could not be found.';
        window.scrollTo(0, 200);
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.template = params['template'];
    });

    this.getForest(this.id);
  }
}
