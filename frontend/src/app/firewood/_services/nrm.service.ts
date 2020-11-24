/* tslint:disable:no-shadowed-variable prefer-const */


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class NrmService {
  private endpoint = environment.apiUrl + 'nrm-service/';

  constructor(private http: HttpClient) { }

  // create an nrm entry
  create(body) {

    console.dir(body)

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let nrmEntry = {
      nrmEntry: body.permitId,
      permitCn: `OF${body.permitNumber}`,
      regionName: null,
      regionCode: body.forest.region,
      forestName: body.forest.forestName,
      forestCode: body.forest.id,
      districtCode: null,
      districtName: null,
      planCn: `OF${body.forest.id}${body.forest.region}01`,
      planNo: `10${body.forest.id}${body.forest.region}01`,
      planDescription: `OF Firewood Permits`,
      issueNumber: `${body.permitNumber[body.permitNumber.length - 1]}${body.permitNumber[body.permitNumber.length - 2]}${body.permitNumber[body.permitNumber.length - 3]}`,
      issueDate: Date.now(),
      permUseCode: 2,
      percentOfSalvageVolume: 25,
      percentOfCwk2Volume: 25,
      percentOfCflrVolume: 25,
      percentOfNftmVolume: 25,
      stateCode: body.forest.stateFips,
      stateName: body.forest.state,
      numberOfPermits: 1,
      convertibleNonConvertible: 'c',
      spuInfo: `{"lineItemNumber": 1, "speciesCode": null, "productCode": 07, "uomCode": 02, "soldQuantity": 01, "rate": "$5.00", "yieldComponentCode": "CD", "mbfConvFacgtor": 02, "ccfConFactor": 02}`
    };

    const options = {
      headers: headers
    };

    return this.http.post(this.endpoint, nrmEntry, options);
  }

  // get all nrm entries
  getAll() {
    return this.http.get(this.endpoint);
  }

}
