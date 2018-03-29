import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html'
})
export class ServerErrorComponent implements OnInit {
  requestingUrl;

  /**
   * Set requesting url from local storage
   */
  ngOnInit() {
    this.requestingUrl = localStorage.getItem('requestingUrl');
  }
}
