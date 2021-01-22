/* tslint:disable:no-shadowed-variable prefer-const */


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class FspsService {
  private endpoint = environment.apiUrl + 'fsps/';

  constructor(private http: HttpClient) { }

  getSpeciesCode = (region) => {
    let code = '';
    switch (region) {
      case '1':
        code = 'FW';
        break;

      case '2':
        code = 'CSFW';
        break;

      case '8':
        code = 'HDW';
        break;

      case '9':
        code = 'MH';
        break;

      default:
        break;
    }
    return code;
  }

  sendPurchaseNotification(permit) {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // prepare the permit object to be sent to FSPS
    // as required by their specifications
    const spuVolumeRates = {
      speciesCode: this.getSpeciesCode(permit.fsForest.region),
      productCode: '07',
      uomCode: '02',
      soldQuantity: '01',
      stumpageSoldValue: '0',
      mbfConvFactor: '02',
      ccfConvFactor: '02'
    };
    const distributions = [{
      budgetOrg: 'N/A',
      jobCode: 'N/A',
      procUnit: 'N/A',
      distAmount: 0
    }];
    const associatedCharges = [{
      budgetOrg: 'N/A',
      jobCode: 'N/A',
      procUnit: 'N/A',
      distAmount: 0
    }];
    const preparedPermit = {
      regionCode: permit.fsForest.region,
      forestCode: permit.fsForest.id,
      districtCode: null,
      permitNumber: permit.permitNumber,
      proclaimedUnitCode: 'N/A',
      availableDate: 'N/A',
      sizeClassCode: 'N/A',
      stateCode: permit.fsForest.stateFips,
      countyCode: 'N/A',
      permitCn: `OF${permit.permitNumber}`,
      spuVolumeRates: spuVolumeRates,
      distributions: distributions,
      associatedCharges: associatedCharges
    };

    const options = {
      headers: headers
    };

    return this.http.post(this.endpoint + permit.permitId, preparedPermit, options);
  }

}
