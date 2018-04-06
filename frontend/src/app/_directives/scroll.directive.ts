import { Directive, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appTrackScroll]'
})
export class TrackScrollDirective implements OnInit {
  offset = 50;
  position = 'bottom';
  @Output() trackScrollEnter = new EventEmitter<boolean>();
  @Output() trackScrollLeave = new EventEmitter<boolean>();

  constructor(private element: ElementRef) {}

  /**
   * Track scroll event
   */
  @HostListener('document:scroll', ['$event'])
  public track(event: Event) {
    this.getPositions();
  }

  /**
   * Emit event when element is scrolled into view, and again when scrolled out of view.
   */
  public getPositions() {
    const offsetTop = this.element.nativeElement.offsetTop;
    const offsetHeight = this.element.nativeElement.offsetHeight;
    const offsetBottom = offsetTop + offsetHeight + Number(this.offset);
    const scrollY: number = window.scrollY + window.innerHeight;

    if (this.position === 'bottom' && offsetBottom <= scrollY) {
      this.trackScrollEnter.emit(true);
    }

    if (this.position === 'bottom' && offsetBottom > scrollY) {
      this.trackScrollLeave.emit(true);
    }
  }

  public ngOnInit() {
    this.getPositions();
  }
}
