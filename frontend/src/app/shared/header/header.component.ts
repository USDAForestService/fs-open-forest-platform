import { Component} from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-page-header',
  templateUrl: './header.component.html'
})
export class PageHeaderComponent {

  constructor(
    private meta: Meta) {}
}
