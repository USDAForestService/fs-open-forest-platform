import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SidebarConfigService {
  SIDEBAR_CONFIG_FILE_URL = 'assets/config/christmasTreesSidebar.json';

  constructor(private http: HttpClient) {
    let obj;
    this.getJSON().subscribe(data => (obj = data));
  }

  /**
   * @returns sidebar config json
   */
  public getJSON(): Observable<any> {
    return this.http.get(this.SIDEBAR_CONFIG_FILE_URL);
  }
}
