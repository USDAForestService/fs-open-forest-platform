import { Component, EventEmitter, OnInit, Input, Output, Renderer2 } from '@angular/core';
import { UtilService } from '../_services/util.service';

@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.component.html'
})
export class SectionHeadingComponent {
  @Input() heading: string;
  @Input() elementId: string;
  @Input() selector = 'h2';

  constructor(private renderer: Renderer2, private util: UtilService) {}

  elementInView(event) {
    if (event.value) {
      this.renderer.addClass(event.target, 'in-view');
    } else {
      this.renderer.removeClass(event.target, 'in-view');
    }

    const viewableElements = document.getElementsByClassName('in-view');
    if (viewableElements[0]) {
      this.util.setCurrentSection(viewableElements[0].id);
    }
  }
}
