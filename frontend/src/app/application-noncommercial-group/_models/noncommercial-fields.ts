export class NoncommercialFields {
  activityDescription: string;
  locationDescription: string;
  startDateTime: string;
  endDateTime: string;
  numberParticipants: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
