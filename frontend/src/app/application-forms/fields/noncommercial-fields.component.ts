import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

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
    },
    {
      validator: this.validatePermitNeeded.bind(this)
    });
    this.parentForm.addControl(this.formName, this[this.formName]);
  }

  /**
   * Validate that there will be enough attendees to warrant needed a permit
   */
  validatePermitNeeded(): ValidatorFn {
    return (group: FormGroup) => {
      const numberSpectators = group.controls.numberSpectators.value;
      const numberParticipants = group.controls.numberParticipants.value;

      if (numberSpectators && numberParticipants && (numberSpectators && numberParticipants < 75) {
        return { notEnoughAttendees: true };
      }
      return null;
    };
  }
}
