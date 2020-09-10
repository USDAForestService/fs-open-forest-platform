import { Component, OnInit } from '@angular/core';

import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-forest-finder',
  templateUrl: './forest-finder.component.html',
})
export class ForestFinderComponent implements OnInit {

  constructor(
    private meta: Meta
  ) {
    this.meta.addTag({
      name: 'description', content: 'Use recreation.gov to purchase\
 a Christmas tree permit with the United States Forest Service.'
    });
  }

  ngOnInit() {
  }
}
