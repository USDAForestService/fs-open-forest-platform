import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RemovePuncPipe } from './remove-punc.pipe';

import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-forest-finder',
  templateUrl: './forest-finder.component.html',
  providers: [RemovePuncPipe]
})
export class FirewoodForestFinderComponent implements OnInit {
  @ViewChild('forestFinder') form: ElementRef;

  forests = [];
  selectedForest = null;
  itemsPerRow = 2;
  showForestSelectError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta
  ) {
    this.meta.addTag({
      name: 'description', content: 'Use Digital Permits to purchase\
 a Firwood permit with the United States Forest Service.'
    });
  }

  /**
   * Set forest from route resolver
   */
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forests = data.forests;

      // sort forests alphabetically
      this.forests.sort(function(a, b) {
        const forestA = a.description;
        const forestB = b.description;

        if (forestA < forestB) {
          return -1;
        }
        if (forestA > forestB) {
          return 1;
        }
        return 0;
      });
    });
  }

  /**
   * Set focus to form
   */
  scrollToForestFinder(event) {
    if (event) {
      event.preventDefault();
    }

    this.form.nativeElement.focus();

  }

  /**
   * Redirect to forest guidelines page
   */
  goToForest(forest) {
    if (forest) {
      this.showForestSelectError = false;
      const navTo = '/firewood/forests/' + forest.forestAbbr;
      this.router.navigate([navTo]);
    } else {
      this.showForestSelectError = true;
    }
  }
}
