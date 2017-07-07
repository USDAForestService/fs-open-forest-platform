export class SpecialUseApplication {
  applicantInfo: ApplicantInfo;
  applicationId: number;
  appControlNumber: string;
  authorizingOfficerName: string;
  authorizingOfficerTitle: string;
  controlNumber: string;
  dateTimeRange: DateTimeRange;
  district: string;
  eventName: string;
  forest: string;
  noncommercialFields: NoncommercialFields;
  tempOutfitterFields: TempOutfitterFields;
  tempOutfitterFiles: TempOutfitterFiles;
  reasonForReturn: string;
  region: string;
  signature: string;
  status: string;
  type: string;
  constructor() {
    this.applicantInfo = new ApplicantInfo();
    this.dateTimeRange = new DateTimeRange();
    this.noncommercialFields = new NoncommercialFields();
    this.tempOutfitterFiles = new TempOutfitterFiles();
    this.tempOutfitterFields = new TempOutfitterFields();
  }
}

export class ApplicantInfo {
  dayPhone: Phone;
  emailAddress: string;
  eveningPhone: Phone;
  faxNumber: Phone;
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
  tenDigit: string;
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
  locationDescription: string;
  numberParticipants: string;
  spectators: string;
}

export class DateTimeRange {
  endDateTime: string;
  endDay: string;
  endMonth: string;
  endYear: string;
  endHour: string;
  endMinutes: string;
  endPeriod: string;
  startDateTime: string;
  startDay: string;
  startMonth: string;
  startYear: string;
  startHour: string;
  startMinutes: string;
  startPeriod: string;
}

export class TempOutfitterFields {
  individualIsCitizen: boolean;
  smallBusiness: boolean;
  activityDescription: string;
  activityDescriptionFields: ActivityDescriptionFields;
  advertisingURL: string;
  advertisingDescription: string;
  clientCharges: string;
  experienceList: string;
  constructor() {
    this.activityDescriptionFields = new ActivityDescriptionFields();
  }
}

export class ActivityDescriptionFields {
  numberServiceDaysRequested: number;
  numberOfTrips: number;
  locationDescription: string;
  servicesProvided: string;
  audienceDescription: string;
  listOfGovernmentFacilities: string;
  listOfTemporaryImprovements: string;
  statementOfMotorizedEquipment: string;
  statementOfTransportationOfLivestock: string;
  statementOfAssignedSite: string;
  descriptionOfCleanupAndRestoration: string;
}

export class TempOutfitterFiles {
  guideDocumentation: string;
  acknowledgementOfRiskForm: string;
  insuranceCertificate: string;
  goodStandingEvidence: string;
  operatingPlan: string;
}
