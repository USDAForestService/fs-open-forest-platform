import { NgModule } from '@angular/core';

import { ApplicationFieldsService } from './_services/application-fields.service';

import { ActivityDescriptionComponent } from './fields/activity-description.component';
import { AddressComponent } from './fields/address.component';
import { AdvertisingComponent } from './fields/advertising.component';
import { ApplicationNoncommercialGroupComponent } from './application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationSubmittedComponent } from './application-submitted/application-submitted.component';
import { ClientChargesComponent } from './fields/client-charges.component';
import { ChristmasTreePermitResolver } from './tree-application-form/christmas-tree-permit-resolver.service';
import { ExperienceComponent } from './fields/experience.component';
import { DateTimeRangeComponent } from './fields/date-time-range.component';
import { DateTimeRangeService } from './_services/date-time-range.service';
import { EmailComponent } from './fields/email.component';
import { FaxComponent } from './fields/fax.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from './fields/file-upload.component';
import { FileUploadService } from './_services/file-upload.service';
import { NoncommercialFieldsComponent } from './fields/noncommercial-fields.component';
import { NoncommercialLearnMoreComponent } from './application-noncommercial-group/noncommercial-learn-more.component';
import { QuantityComponent } from './fields/quantity.component';
import { OrganizationNameComponent } from './fields/organization-name.component';
import { OrgTypeComponent } from './fields/org-type.component';
import { PermitHolderNameComponent } from './fields/permit-holder-name.component';
import { PhoneNumberComponent } from './fields/phone-number.component';
import { SmallBusinessComponent } from './fields/small-business.component';
import { SharedModule } from './../shared/shared.module';
import { TemporaryOutfittersComponent } from './temporary-outfitters/temporary-outfitters.component';
import { TempOutfitterLeftNavComponent } from './temporary-outfitters/temp-outfitter-left-nav.component';
import { TemporaryOutfittersLearnMoreComponent } from './temporary-outfitters/temporary-outfitters-learn-more.component';
import { WebsiteComponent } from './fields/website.component';
import { TreeApplicationFormComponent } from './tree-application-form/tree-application-form.component';
import { TreePermitViewComponent } from './tree-application-form/tree-permit-view/tree-permit-view.component';
import { TreePermitRulesComponent } from './tree-application-form/tree-permit-rules/tree-permit-rules.component';

@NgModule({
  declarations: [
    ActivityDescriptionComponent,
    AddressComponent,
    AdvertisingComponent,
    ApplicationNoncommercialGroupComponent,
    ApplicationSubmittedComponent,
    ClientChargesComponent,
    DateTimeRangeComponent,
    EmailComponent,
    ExperienceComponent,
    FaxComponent,
    FileUploadComponent,
    NoncommercialLearnMoreComponent,
    NoncommercialFieldsComponent,
    QuantityComponent,
    OrganizationNameComponent,
    OrgTypeComponent,
    PermitHolderNameComponent,
    PhoneNumberComponent,
    SmallBusinessComponent,
    TemporaryOutfittersComponent,
    TempOutfitterLeftNavComponent,
    TemporaryOutfittersLearnMoreComponent,
    TreeApplicationFormComponent,
    TreePermitRulesComponent,
    TreePermitViewComponent,
    WebsiteComponent
  ],
  exports: [
    ActivityDescriptionComponent,
    AddressComponent,
    AdvertisingComponent,
    ApplicationNoncommercialGroupComponent,
    ApplicationSubmittedComponent,
    ClientChargesComponent,
    DateTimeRangeComponent,
    EmailComponent,
    ExperienceComponent,
    FaxComponent,
    FileUploadComponent,
    NoncommercialLearnMoreComponent,
    NoncommercialFieldsComponent,
    QuantityComponent,
    OrganizationNameComponent,
    OrgTypeComponent,
    PermitHolderNameComponent,
    PhoneNumberComponent,
    SmallBusinessComponent,
    TemporaryOutfittersComponent,
    TempOutfitterLeftNavComponent,
    TemporaryOutfittersLearnMoreComponent,
    TreeApplicationFormComponent,
    TreePermitRulesComponent,
    TreePermitViewComponent,
    WebsiteComponent
  ],
  imports: [FileUploadModule, SharedModule],
  providers: [
    ApplicationFieldsService,
    DateTimeRangeService,
    FileUploadService,
    ChristmasTreePermitResolver,
  ]
})
export class ApplicationsModule {}
