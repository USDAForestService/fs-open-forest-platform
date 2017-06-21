import { Component, Input, OnInit  } from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-org-type',
  templateUrl: './org-type.component.html'
})

export class OrgTypeComponent implements OnInit {
  @Input() parentForm: FormGroup;
  applicantInfo: FormGroup;
  formName: string;

  constructor() {}

  ngOnInit() {
    this.formName = 'applicantInfo';
    // this[this.formName] = this.formBuilder.group({
    //   orgType : ['Person', [Validators.required]]
    // });
    // this.parentForm.addControl(this.formName, this[this.formName]);
  }

}
