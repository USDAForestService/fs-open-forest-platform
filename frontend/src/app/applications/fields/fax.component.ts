import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-fax',
  templateUrl: './fax.component.html'
})
export class FaxComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() name: string;
  fax = 'fax';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    const fax = this.formBuilder.group({
      areaCode: [],
      extension: [],
      number: [],
      phoneType: ['fax'],
      prefix: [],
      tenDigit: ['', [Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.parentForm.addControl('fax', fax);

    this.parentForm.get('fax.tenDigit').valueChanges.subscribe(value => {
      this.parentForm.patchValue({ fax: { areaCode: value.substring(0, 3) } });
      this.parentForm.patchValue({ fax: { prefix: value.substring(3, 6) } });
      this.parentForm.patchValue({ fax: { number: value.substring(6, 10) } });
    });
  }
}
