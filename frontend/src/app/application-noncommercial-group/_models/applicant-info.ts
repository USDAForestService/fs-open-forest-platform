import { Phone } from './phone';

export class ApplicantInfo {
  firstName: string;
  lastName: string;
  dayPhone: Phone;
  eveningPhone: Phone;
  emailAddress: string;
  mailingAddress: string;
  mailingAddress2: string;
  mailingCity: string;
  mailingState: string;
  mailingZIP: string;
  organizationName: string;
  website: string;
  orgType: OrgTypes;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export enum OrgTypes {
  'individual',
  'group'
}
