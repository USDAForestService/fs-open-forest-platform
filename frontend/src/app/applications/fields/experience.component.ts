import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html'
})

export class ExperienceComponent implements OnInit {
  @Input() parentForm: FormGroup;
  experienceFields = 'experienceFields';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const experienceFields = this.formBuilder.group({
      haveNationalForestPermits: [false],
      listAllNationalForestPermits: ['', [Validators.required]],
      haveOtherPermits: [false],
      listAllOtherPermits: ['', [Validators.required]],
      haveCitations: [false],
      listAllCitations: ['', [Validators.required]]
    });
    this.parentForm.addControl('experienceFields', experienceFields);
  }
}
