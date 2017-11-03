import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForestService } from '../../_services/forest.service';

@Component({
  selector: 'app-forest-finder',
  templateUrl: './forest-finder.component.html',
  styleUrls: ['./forest-finder.component.scss']
})
export class ForestFinderComponent implements OnInit {

  forests = [];

  constructor(private route: ActivatedRoute, private service: ForestService) {}

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.forests = data.forests;
    });
  }

}