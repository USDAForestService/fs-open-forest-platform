import { Component, Input, Renderer2 } from '@angular/core';
import { UtilService } from '../_services/util.service';

@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.component.html'
})
export class SectionHeadingComponent {
  @Input() heading: string;
  @Input() elementId: string;
  @Input() selector = 'h2';
  @Input() id = '';

  constructor(private renderer: Renderer2, private util: UtilService) {}

  /**
   * If element is in view add or remove in-view class
   */
  elementInView(event) {
    if (event && event.value) {
      this.renderer.addClass(event.target, 'in-view');
    } else {
      this.renderer.removeClass(event.target, 'in-view');
    }
    this.setCurrentSection();
  }

  /**
   * Set current section as element that is in viewport
   */
  private setCurrentSection() {
    const viewableElements = document.getElementsByClassName('in-view');
    if (viewableElements[0]) {
      if (viewableElements[0].attributes['attr-id'].value) {
        this.util.setCurrentSection(viewableElements[0].attributes['attr-id'].value);
        history.replaceState(undefined, undefined, window.location.pathname + '#' + viewableElements[0].attributes['attr-id'].value);
      } else {
        this.util.setCurrentSection(viewableElements[0].id);
      }
    }
  }
}
