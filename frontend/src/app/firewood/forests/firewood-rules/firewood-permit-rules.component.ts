import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { FirewoodInfoService } from '../../_services/firewood-info.service';
import { FirewoodApplicationService } from '../../_services/firewood-application.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WindowRef } from '../../../_services/native-window.service';

@Component({
  selector: 'app-firewood-permit-rules',
  templateUrl: './firewood-permit-rules.component.html',
  providers: [FilterPipe]
})
export class FirewoodPermitRulesComponent implements OnInit {
  @Input() forest: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() numberOfCords: any;
  @Input() emailAddress: any;
  applicationRulesForm: FormGroup;
  buttonDisabled: boolean;

  constructor(
    private firewoodInfoService: FirewoodInfoService,
    private applicationService: FirewoodApplicationService,
    private winRef: WindowRef
  ) {
    this.applicationRulesForm = new FormGroup({
      acceptRules: new FormControl()
    });
    this.buttonDisabled = false;
  }

  ngOnInit() {
  }

  createApplication() {
    this.buttonDisabled = true;
    const data = {
      forestId: this.forest.id,
      firstName: this.firstName,
      lastName: this.lastName,
      emailAddress: this.emailAddress,
      quantity: this.numberOfCords
    };

    if (this.applicationRulesForm.valid) {
      this.applicationService.create(JSON.stringify(data)).subscribe((response: any) => {
        this.winRef.getNativeWindow().location.href = `${response.payGovUrl}?token=${response.token}&tcsAppID=${response.tcsAppID}`;
      }, (error: any) => {
        window.location.hash = '';
        this.applicationRulesForm.get('acceptRules').setValue(false);
        this.winRef.getNativeWindow().scroll(0, 0);
      });
    }
  }
}
