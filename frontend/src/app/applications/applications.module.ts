import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ApplicationFieldsService } from './_services/application-fields.service';

import { ActivityDescriptionComponent } from './fields/activity-description.component';
import { AddressComponent } from './fields/address.component';
import { AdvertisingComponent } from './fields/advertising.component';
import { ApplicationNoncommercialGroupComponent } from './application-noncommercial-group/application-noncommercial-group.component';
import { ClientChargesComponent } from './fields/client-charges.component';
import { ExperienceComponent } from './fields/experience.component';
import { DateTimeRangeComponent } from './fields/date-time-range.component';
import { EmailComponent } from './fields/email.component';
import { FaxComponent } from './fields/fax.component';
import { FileUploadComponent } from './fields/file-upload.component';
import { FileUploader, FileSelectDirective } from '../../../node_modules/ng2-file-upload/ng2-file-upload';
import { NoncommercialFieldsComponent } from './fields/noncommercial-fields.component';
import { OrganizationNameComponent } from './fields/organization-name.component';
import { OrgTypeComponent } from './fields/org-type.component';
import { PermitHolderNameComponent } from './fields/permit-holder-name.component';
import { PhoneNumberComponent } from './fields/phone-number.component';
import { SmallBusinessComponent } from './fields/small-business.component';
import { TemporaryOutfittersComponent } from './temporary-outfitters/temporary-outfitters.component';
import { WebsiteComponent } from './fields/website.component';


@NgModule({
  declarations: [
    ActivityDescriptionComponent,
    AddressComponent,
    AdvertisingComponent,
    ApplicationNoncommercialGroupComponent,
    ClientChargesComponent,
    DateTimeRangeComponent,
    EmailComponent,
    ExperienceComponent,
    FaxComponent,
    FileSelectDirective,
    FileUploadComponent,
    NoncommercialFieldsComponent,
    OrganizationNameComponent,
    OrgTypeComponent,
    PermitHolderNameComponent,
    PhoneNumberComponent,
    SmallBusinessComponent,
    TemporaryOutfittersComponent,
    WebsiteComponent
  ],
  exports: [
    ActivityDescriptionComponent,
    AddressComponent,
    AdvertisingComponent,
    ApplicationNoncommercialGroupComponent,
    ClientChargesComponent,
    DateTimeRangeComponent,
    EmailComponent,
    ExperienceComponent,
    FaxComponent,
    FileSelectDirective,
    FileUploadComponent,
    NoncommercialFieldsComponent,
    OrganizationNameComponent,
    OrgTypeComponent,
    PermitHolderNameComponent,
    PhoneNumberComponent,
    SmallBusinessComponent,
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
