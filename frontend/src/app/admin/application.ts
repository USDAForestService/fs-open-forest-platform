export class Application {
  region: string;
  forest: string;
  district: string;
  authorizingOfficerName: string;
  authorizingOfficerTitle: string;
  eventName: string;
  type: string;
  applicantInfo: ApplicantInfo;
  noncommercialFields: NoncommercialFields;
  constructor() {
    this.applicantInfo = new ApplicantInfo();
    this.noncommercialFields = new NoncommercialFields();
  }
}

export class ApplicantInfo {
  organizationName: string;
  website: string;
  orgType: string;
  dayPhone: Phone;
  eveningPhone: Phone;
  emailAddress: string;
  organizationAddress: Address;
  primaryFirstName: string;
  primaryLastName: string;
  primaryAddress: Address;
  secondaryFirstName: string;
  secondaryLastName: string;
  secondaryAddress: Address;
  constructor() {
    this.dayPhone = new Phone();
    this.eveningPhone = new Phone();
    this.primaryAddress = new Address();
    this.organizationAddress = new Address();
    this.secondaryAddress = new Address();
  }
}

export class Phone {
  areaCode: string;
  prefix: string;
  number: string;
  extension: string;
  phoneType: string;
}

export class Address {
  mailingAddress: string;
  mailingAddress2: string;
  mailingCity: string;
  mailingState: string;
  mailingZip: string;
}

export class NoncommercialFields {
  activityDescription: string;
  locationDescription: string;
  startMonth: string;
  startDay: string;
  startYear: string;
  endMonth: string;
  endDay: string;
  endYear: string;
  startHour: string;
  startMinutes: string;
  startPeriod: string;
  endHour: string;
  endMinutes: string;
  endPeriod: string;
  numParticipants: string;
}
