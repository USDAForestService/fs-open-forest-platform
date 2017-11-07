import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { alphanumericValidator } from '../validators/alphanumeric-validation';

@Component({
  selector: 'app-activity-description',
  templateUrl: './activity-description.component.html'
})
export class ActivityDescriptionComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() name: string;
  @Input() pointOfView: string;

  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false,
    dateTimeSpan: 0
  };

  @Output() updateRootDateStatus: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private applicationFieldsService: ApplicationFieldsService) {}

  ngOnInit() {
    const activityDescription = this.formBuilder.group({
      numberServiceDaysRequested: [this.dateStatus.dateTimeSpan, [alphanumericValidator(), Validators.maxLength(255)]],
      numberOfTrips: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      partySize: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      locationDescription: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(400)]],
      servicesProvided: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(400)]],
      audienceDescription: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(400)]],
      needGovernmentFacilities: [false],
      listOfGovernmentFacilities: ['', Validators.maxLength(400)],
      needTemporaryImprovements: [false],
      listOfTemporaryImprovements: ['', Validators.maxLength(400)],
      haveMotorizedEquipment: [false],
      statementOfMotorizedEquipment: ['', Validators.maxLength(400)],
      haveLivestock: [false],
      statementOfTransportationOfLivestock: ['', Validators.maxLength(400)],
      needAssignedSite: [false],
      statementOfAssignedSite: ['', Validators.maxLength(400)],
      descriptionOfCleanupAndRestoration: [
        '',
        [Validators.required, alphanumericValidator(), Validators.maxLength(400)]
      ]
    });
    this.parentForm.addControl('activityDescriptionFields', activityDescription);

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('activityDescriptionFields.needGovernmentFacilities'),
      this.parentForm.get('activityDescriptionFields.listOfGovernmentFacilities')
    );

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('activityDescriptionFields.needTemporaryImprovements'),
      this.parentForm.get('activityDescriptionFields.listOfTemporaryImprovements')
    );

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('activityDescriptionFields.haveMotorizedEquipment'),
      this.parentForm.get('activityDescriptionFields.statementOfMotorizedEquipment')
    );

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('activityDescriptionFields.haveLivestock'),
      this.parentForm.get('activityDescriptionFields.statementOfTransportationOfLivestock')
    );

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('activityDescriptionFields.needAssignedSite'),
      this.parentForm.get('activityDescriptionFields.statementOfAssignedSite')
    );
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
    this.updateRootDateStatus.emit(dateStatus);
  }
}
