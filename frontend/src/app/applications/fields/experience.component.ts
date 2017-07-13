import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html'
})
export class ExperienceComponent implements OnInit {
  @Input() parentForm: FormGroup;
  experienceFields = 'experienceFields';

  constructor(private formBuilder: FormBuilder, private applicationFieldsService: ApplicationFieldsService) {}

  ngOnInit() {
    const experienceFields = this.formBuilder.group({
      haveNationalForestPermits: [false],
      listAllNationalForestPermits: [''],
      haveOtherPermits: [false],
      listAllOtherPermits: [''],
      haveCitations: [false],
      listAllCitations: ['']
    });
    this.parentForm.addControl('experienceFields', experienceFields);

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('experienceFields.haveNationalForestPermits'),
      this.parentForm.get('experienceFields.listAllNationalForestPermits')
    );

    this.applicationFieldsService.simpleRequireToggle(this.parentForm.get('experienceFields.haveOtherPermits'), this.parentForm.get('experienceFields.listAllOtherPermits'));

    this.applicationFieldsService.simpleRequireToggle(this.parentForm.get('experienceFields.haveCitations'), this.parentForm.get('experienceFields.listAllCitations'));
  }
}
