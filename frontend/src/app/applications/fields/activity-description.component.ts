import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-activity-description',
  templateUrl: './activity-description.component.html'
})

export class ActivityDescriptionComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() name: string;
  activityDescription = 'activityDescription';

  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const activityDescription = this.formBuilder.group({
      numberServiceDaysRequested: [],
      numberOfTrips: [],
      locationDescription: [],
      servicesProvided: [],
      audienceDescription: [],
      listOfGovernmentFacilities: [],
      listOfTemporaryImprovements: [],
      statementOfMotorizedEquipment: [],
      statementOfTransportationOfLivestock: [],
      statementOfAssignedSite: [],
      descriptionOfCleanupAndRestoration: []
    });
    this.parentForm.addControl('activityDescription', activityDescription);
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

}
