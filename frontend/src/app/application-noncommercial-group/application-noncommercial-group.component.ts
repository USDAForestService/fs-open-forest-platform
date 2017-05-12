import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-noncommercial-group',
  templateUrl: './application-noncommercial-group.component.html',
  styleUrls: ['./application-noncommercial-group.component.scss']
})
export class ApplicationNoncommercialGroupComponent implements OnInit {

  application = {};

  states = [
    'Wisconsin',
    'Illinois'
  ];

  onSubmit() {
    console.log('submit');
  }

  constructor() { }

  ngOnInit() {
  }



}
