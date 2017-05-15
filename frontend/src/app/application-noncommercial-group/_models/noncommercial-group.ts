import { ApplicantInfo } from './applicant-info';
import { NoncommercialFields } from './noncommercial-fields';

export class NoncommercialGroup {
  region: string;
  forest: string;
  district: string;
  authorizingOfficerName: string;
  authorizingOfficerTitle: string;
  applicantInfo: ApplicantInfo;
  type: Types;
  noncomercialFields: NoncommercialFields;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export enum Types {
  'noncommercial',
  'commercial'
}
