import { Injectable } from '@angular/core';
import { HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { UtilService } from '../_services/util.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private router: Router, public util: UtilService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.util.addRequest();

    const handleObs: Observable<HttpEvent<any>> = next.handle(req);

    return handleObs.do(event => {
      if (event instanceof HttpResponse) {
        this.util.removeRequest();
      }
    })
    .catch((err: HttpErrorResponse) => {
      this.util.setRequests(0);
      this.util.setProgress(false);
      if (err.status === 404) {
        this.router.navigate(['/404']);
      }
      return Observable.throw(err);
    });
  }

}
