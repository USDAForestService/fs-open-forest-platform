export class Application {
  applicantInfo: ApplicantInfo;
  applicationId: number;
  appControlNumber: string;
  authorizingOfficerName: string;
  authorizingOfficerTitle: string;
  district: string;
  eventName: string;
  forest: string;
  noncommercialFields: NoncommercialFields;
  tempOutfittersFields: TempOutfittersFields;
  tempOutfittersFiles: TempOutfittersFiles;
  reasonForReturn: string;
  region: string;
  signature: string;
  type: string;
  constructor() {
    this.applicantInfo = new ApplicantInfo();
    this.noncommercialFields = new NoncommercialFields();
    this.tempOutfittersFiles = new TempOutfittersFiles();
    this.tempOutfittersFields = new TempOutfittersFields();
  }
}

export class ApplicantInfo {
  dayPhone: Phone;
  emailAddress: string;
  eveningPhone: Phone;
  organizationAddress: Address;
  organizationName: string;
  orgType: string;
  primaryAddress: Address;
  primaryFirstName: string;
  primaryLastName: string;
  secondaryAddress: Address;
  secondaryFirstName: string;
  secondaryLastName: string;
  website: string;
  constructor() {
    this.dayPhone = new Phone();
    this.eveningPhone = new Phone();
    this.organizationAddress = new Address();
    this.primaryAddress = new Address();
    this.secondaryAddress = new Address();
  }
}

export class Phone {
  areaCode: string;
  extension: string;
  number: string;
  phoneType: string;
  prefix: string;
}

export class Address {
  mailingAddress: string;
  mailingAddress2: string;
  mailingCity: string;
  mailingState: string;
  mailingZIP: string;
}

export class NoncommercialFields {
  activityDescription: string;
  endDateTime: string;
  endDay: string;
  endMonth: string;
  endYear: string;
  endHour: string;
  endMinutes: string;
  endPeriod: string;
  locationDescription: string;
  numberParticipants: string;
  spectators: string;
  startDateTime: string;
  startDay: string;
  startMonth: string;
  startYear: string;
  startHour: string;
  startMinutes: string;
  startPeriod: string;
}

export class TempOutfittersFields {
  individualCitizen: boolean;
  smallBusiness: boolean;
  activityDescription: string;
  advertisingURL: string;
  advertisingDescription: string;
  clientCharges: string;
  experienceList: string;
}

export class TempOutfittersFiles {
  guideDocumentation: File;
  acknowledgementOfRiskForm: File;
  insuranceCertificate: File;
  goodStandingEvidence: File;
  operatingPlan: File;
}
