export interface Application {
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
  type: string;
}

export interface ApplicantInfo {
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
}

export interface Phone {
  tenDigit: string;
  areaCode: string;
  extension: string;
  number: string;
  phoneType: string;
  prefix: string;
}

export interface Address {
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

export interface TempOutfitterFields {
  individualCitizen: boolean;
  smallBusiness: boolean;
  activityDescription: string;
  advertisingURL: string;
  advertisingDescription: string;
  clientCharges: string;
  experienceList: string;
}

export interface TempOutfitterFiles {
  guideDocumentation: string;
  acknowledgementOfRiskForm: string;
  insuranceCertificate: string;
  goodStandingEvidence: string;
  operatingPlan: string;
}
