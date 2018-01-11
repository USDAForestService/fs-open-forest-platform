import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UtilService } from '../../_services/util.service';

@Injectable()
export class TreesService {
  private endpoint = environment.apiUrl + 'forests/';

  constructor(private http: HttpClient, private router: Router, public util: UtilService) {}

  getOne(id) {
    return this.http.get(this.endpoint + id);
  }
}
