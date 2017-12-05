import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SidebarConfigService {

  SIDEBAR_CONFIG_FILE_URL = 'assets/config/christmasTreesSidebar.json'

  constructor(private http: Http) {
    let obj;
    this.getJSON().subscribe(data => obj = data);
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.SIDEBAR_CONFIG_FILE_URL)
      .map((res: any) => res.json());
  }
}
