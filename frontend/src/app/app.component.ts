import { Component } from '@angular/core';
import template = require('./app.component.pug');

@Component({
  selector: 'app-root',
  template: template.toString(),
  // styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
}
