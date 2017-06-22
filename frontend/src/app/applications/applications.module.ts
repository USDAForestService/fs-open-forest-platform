import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ApplicationFieldsService } from './_services/application-fields.service';

import { AddressComponent } from './fields/address.component';
import { ApplicationNoncommercialGroupComponent } from './application-noncommercial-group/application-noncommercial-group.component';
import { DateTimeRangeComponent } from './fields/date-time-range.component';
import { EmailComponent } from './fields/email.component';
import { FileUploadComponent } from './fields/file-upload.component';
import { FileUploader, FileSelectDirective } from '../../../node_modules/ng2-file-upload/ng2-file-upload';
import { NoncommercialFieldsComponent } from './fields/noncommercial-fields.component';
import { OrganizationNameComponent } from './fields/organization-name.component';
import { OrgTypeComponent } from './fields/org-type.component';
import { PermitHolderNameComponent } from './fields/permit-holder-name.component';
import { PhoneNumberComponent } from './fields/phone-number.component';
import { TemporaryOutfittersComponent } from './temporary-outfitters/temporary-outfitters.component';
import { WebsiteComponent } from './fields/website.component';


@NgModule({
  declarations: [
    AddressComponent,
    ApplicationNoncommercialGroupComponent,
    DateTimeRangeComponent,
    EmailComponent,
    FileSelectDirective,
    FileUploadComponent,
    NoncommercialFieldsComponent,
    OrganizationNameComponent,
    OrgTypeComponent,
    PermitHolderNameComponent,
    PhoneNumberComponent,
    TemporaryOutfittersComponent,
    WebsiteComponent
  ],
  exports: [
    AddressComponent,
    ApplicationNoncommercialGroupComponent,
    DateTimeRangeComponent,
    EmailComponent,
    FileSelectDirective,
    FileUploadComponent,
    NoncommercialFieldsComponent,
    OrganizationNameComponent,
    OrgTypeComponent,
    PermitHolderNameComponent,
    PhoneNumberComponent,
    TemporaryOutfittersComponent,
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
