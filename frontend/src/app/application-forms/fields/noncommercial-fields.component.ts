import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { numberValidator } from '../validators/number-validation';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { isNumeric } from 'rxjs/util/isNumeric';

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
      activityDescription: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(1000)]],
      locationDescription: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      numberParticipants: ['', [Validators.required, alphanumericValidator(), Validators.minLength(1), Validators.maxLength(255), numberValidator(true)]],
      numberSpectators: ['',	[Validators.required, alphanumericValidator(), Validators.maxLength(255), numberValidator(true)]]
    },
    {
      validator: this.validatePermitNeeded
    });
    this.parentForm.addControl(this.formName, this[this.formName]);
  }

  /**
   * Validate that there will be enough attendees to warrant needed a permit
   */
  validatePermitNeeded(group: FormGroup) {
    const numberSpectators = group.controls.numberSpectators;
    const numberParticipants = group.controls.numberParticipants;
    const totalAttendees = numberSpectators.value + numberParticipants.value;

    if (isNumeric(numberSpectators.value) &&
    totalAttendees < 75) {
      return { notEnoughAttendees: true };
    }
    return null;
  }
}
