import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-noncommercial-fields',
  templateUrl: './noncommercial-fields.component.html'
})
export class NoncommercialFieldsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  formName: string;

  noncommercialFields: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formName = 'noncommercialFields';
    this[this.formName] = this.formBuilder.group({
      activityDescription: ['', [Validators.required]],
      locationDescription: ['', [Validators.required]],
      numberParticipants: ['', [Validators.required, Validators.minLength(1)]],
      spectators: ['', [Validators.required]]
    });
    this.parentForm.addControl(this.formName, this[this.formName]);
  }
}
