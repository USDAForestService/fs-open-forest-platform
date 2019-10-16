import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './header.component.html'
})
export class PageHeaderComponent {

  constructor(private router: Router) {}

  giveFeedback() {
    this.router.navigate(['/feedback']);
  }
}
