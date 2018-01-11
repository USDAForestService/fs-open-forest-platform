import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-mock-page-header',
  template: '<ng-container></ng-container>',
  styles: [`
    .usa-mock-header {
        background-color: white !important;
    }
    h1 {
        font-family: "Arial", sans-serif;
        color: #03275a !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class MockPageHeaderComponent {
  constructor() {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.fontFamily = 'Arial';
  }


}
