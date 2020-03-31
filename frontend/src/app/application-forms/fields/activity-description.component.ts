import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  toggleSubFields: any;

  @Output() updateRootDateStatus: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, public afs: ApplicationFieldsService) {
    this.toggleSubFields = [
      {'toggleField': 'needGovernmentFacilities',
      'dataField': 'listOfGovernmentFacilities'},
      {'toggleField': 'needTemporaryImprovements',
      'dataField': 'listOfTemporaryImprovements'},
      {'toggleField': 'haveMotorizedEquipment',
      'dataField': 'statementOfMotorizedEquipment'},
      {'toggleField': 'haveLivestock',
      'dataField': 'statementOfTransportationOfLivestock'},
      {'toggleField': 'needAssignedSite',
      'dataField': 'statementOfAssignedSite'}
    ];
  }

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
    this.afs.toggleSwitchAdder(this.toggleSubFields, 'activityDescriptionFields', this.parentForm);

  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
    this.updateRootDateStatus.emit(dateStatus);
  }
}
