import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-temp-outfitter-left-nav',
  templateUrl: './temp-outfitter-left-nav.component.html'
})
export class TempOutfitterLeftNavComponent implements OnInit {
  @Input() applicationForm: any;

  constructor() {}

  ngOnInit() {}
}
