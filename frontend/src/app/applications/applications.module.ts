import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ApplicationFieldsService } from './_services/application-fields.service';

import { AddressComponent } from './fields/address.component';
import { DateTimeRangeComponent } from './fields/date-time-range.component';
import { EmailComponent } from './fields/email.component';
import { NoncommercialFieldsComponent } from './fields/noncommercial-fields.component';
import { OrganizationNameComponent } from './fields/organization-name.component';
import { OrgTypeComponent } from './fields/org-type.component';
import { PermitHolderNameComponent } from './fields/permit-holder-name.component';
import { PhoneNumberComponent } from './fields/phone-number.component';
import { WebsiteComponent } from './fields/website.component';


@NgModule({
  declarations: [
    AddressComponent,
    DateTimeRangeComponent,
    EmailComponent,
    NoncommercialFieldsComponent,
    OrganizationNameComponent,
    OrgTypeComponent,
    PermitHolderNameComponent,
    PhoneNumberComponent,
    WebsiteComponent
  ],
  exports: [
    AddressComponent,
    DateTimeRangeComponent,
    EmailComponent,
    NoncommercialFieldsComponent,
    OrganizationNameComponent,
    OrgTypeComponent,
    PermitHolderNameComponent,
    PhoneNumberComponent,
    WebsiteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ApplicationFieldsService
  ]
})

export class ApplicationsModule {}
