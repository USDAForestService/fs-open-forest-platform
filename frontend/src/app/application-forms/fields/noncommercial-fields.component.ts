import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { numberValidator } from '../validators/number-validation';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-noncommercial-fields',
  templateUrl: './noncommercial-fields.component.html'
})
export class NoncommercialFieldsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  formName: string;

  noncommercialFields: FormGroup;

  constructor(private formBuilder: FormBuilder, public afs: ApplicationFieldsService) {}

  ngOnInit() {
    this.formName = 'noncommercialFields';
    this[this.formName] = this.formBuilder.group({
      activityDescription: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(512)]],
      locationDescription: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      numberParticipants: [
        '',
        [
          Validators.required,
          alphanumericValidator(),
          Validators.minLength(1),
          Validators.maxLength(255),
          numberValidator()
        ]
      ],
      numberSpectators: [
        '',
        [Validators.required, alphanumericValidator(), Validators.maxLength(255), numberValidator()]
      ]
    });
    this.parentForm.addControl(this.formName, this[this.formName]);
  }
}
