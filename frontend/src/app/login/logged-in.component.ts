import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logged-in',
  template: ''
})
export class LoggedInComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    let requestingUrl = localStorage.getItem('requestingUrl');
    if (requestingUrl) {
      localStorage.removeItem('requestingUrl');
      this.router.navigate([requestingUrl]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
