import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit {
  @Input() heading: string;
  @Input() message: string;

  constructor() {}

  ngOnInit() {}
}
