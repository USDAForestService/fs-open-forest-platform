import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';

@Injectable()
export class SidebarConfigService {
  TREES_SIDEBAR_CONFIG_FILE_URL = 'assets/config/christmasTreesSidebar.json';
  FIREWOOD_SIDEBAR_CONFIG_FILE_URL = 'assets/config/firewoodSidebar.json';

  constructor(private http: HttpClient) {
    let obj;
    let permitType;
    this.getJSON(permitType).subscribe(data => (obj = data));
  }

  /**
   * @returns sidebar config json
   */
  public getJSON(type): Observable<any> {
    let config = '';
    if (type === 'trees') {
      config = this.TREES_SIDEBAR_CONFIG_FILE_URL;
    }
    if (type === 'firewood') {
      config = this.FIREWOOD_SIDEBAR_CONFIG_FILE_URL;
    }
    return this.http.get(config);
  }
}
