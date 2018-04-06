import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-fax',
  templateUrl: './fax.component.html'
})
export class FaxComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() name: string;
  formName: string;
  fax: any;

  constructor(private formBuilder: FormBuilder, public afs: ApplicationFieldsService) {}

  createForm() {
    this.formName = 'fax';
    this[this.formName] = this.formBuilder.group({
      areaCode: [null, Validators.maxLength(3)],
      extension: [null, [Validators.minLength(1), Validators.maxLength(6)]],
      number: [null, Validators.maxLength(4)],
      prefix: [null, Validators.maxLength(3)],
      tenDigit: ['', [Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.parentForm.addControl(this.formName, this[this.formName]);
    this.fax = this.parentForm.get('fax');
  }

  changeSubscribers() {
    this.parentForm.get('fax.extension').valueChanges.subscribe(value => {
      if (value) {
        this.parentForm
          .get('fax.tenDigit')
          .setValidators([Validators.minLength(10), Validators.maxLength(10), Validators.required]);
        this.parentForm.get('fax.tenDigit').updateValueAndValidity();
      } else {
        this.parentForm.get('fax.tenDigit').setValidators([Validators.minLength(10), Validators.maxLength(10)]);
        this.parentForm.get('fax.tenDigit').updateValueAndValidity();
      }
    });

    this.afs.phoneChangeSubscribers(this.parentForm, 'fax');
  }

  ngOnInit() {
    this.createForm();
    this.changeSubscribers();
  }
}
