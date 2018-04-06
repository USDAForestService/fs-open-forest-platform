import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html'
})
export class ExperienceComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() pointOfView: string;
  experienceFields = 'experienceFields';
  toggleSubFields: any;
  constructor(private formBuilder: FormBuilder, public afs: ApplicationFieldsService) {
    this.toggleSubFields = [
      {'toggleField': 'haveNationalForestPermits',
      'dataField': 'listAllNationalForestPermits'},
      {'toggleField': 'haveOtherPermits',
      'dataField': 'listAllOtherPermits'},
      {'toggleField': 'haveCitations',
      'dataField': 'listAllCitations'}
    ];
  }

  ngOnInit() {
    const experienceFields = this.formBuilder.group({
      haveNationalForestPermits: [false],
      listAllNationalForestPermits: ['', Validators.maxLength(512)],
      haveOtherPermits: [false],
      listAllOtherPermits: ['', Validators.maxLength(512)],
      haveCitations: [false],
      listAllCitations: ['', Validators.maxLength(512)]
    });
    this.parentForm.addControl('experienceFields', experienceFields);
    this.afs.toggleSwitchAdder(this.toggleSubFields, 'experienceFields', this.parentForm);

  }
}
