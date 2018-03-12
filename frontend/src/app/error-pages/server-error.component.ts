import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'server-error',
  templateUrl: './server-error.component.html'
})
export class ServerErrorComponent implements OnInit {
  requestingUrl;
  ngOnInit() {
    this.requestingUrl = localStorage.getItem('requestingUrl');
  }
}
