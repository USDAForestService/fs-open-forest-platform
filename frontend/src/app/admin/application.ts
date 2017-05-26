export class Application {
  applicantInfo: ApplicantInfo;
  id: number;
  authorizingOfficerName: string;
  authorizingOfficerTitle: string;
  district: string;
  eventName: string;
  forest: string;
  noncommercialFields: NoncommercialFields;
  region: string;
  signature: string;
  type: string;
  constructor() {
    this.applicantInfo = new ApplicantInfo();
    this.noncommercialFields = new NoncommercialFields();
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
