import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usa-banner',
  templateUrl: './usa-banner.component.html'
})
export class UsaBannerComponent implements OnInit {

  open: boolean;

  constructor() { }

  toggleBanner() {
    (this.open) ? this.open = false : this.open = true;
  }

  ngOnInit() {
  }

}
