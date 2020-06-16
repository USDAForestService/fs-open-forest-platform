import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';

@Injectable()
export class SidebarConfigService {
  TREES_SIDEBAR_CONFIG_FILE_URL = 'assets/config/christmasTreesSidebar.json';
  FIREWOOD_SIDEBAR_CONFIG_FILE_URL = 'assets/config/firewoodSidebar.json';

  constructor(private http: HttpClient) {
    let obj;
    let type;
    this.getJSON(type).subscribe(data => (obj = data));
  }

  /**
   * @returns sidebar config json
   */
  public getJSON(which): Observable<any> {
    switch(which) {
      case 'trees':
        return this.http.get(this.TREES_SIDEBAR_CONFIG_FILE_URL);
        break;
      case 'firewood':
        return this.http.get(this.FIREWOOD_SIDEBAR_CONFIG_FILE_URL);
        break;
      default:
        return this.http.get(this.FIREWOOD_SIDEBAR_CONFIG_FILE_URL);
        break;
    }
  }

}
