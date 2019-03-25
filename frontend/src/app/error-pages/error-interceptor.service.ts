
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';



import { UtilService } from '../_services/util.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, public util: UtilService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.util.addRequest();

    const handleObs: Observable<HttpEvent<any>> = next.handle(req);

    return handleObs.pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.util.removeRequest();
        }
      }),
      catchError((err: HttpErrorResponse) => {
        this.handleRoute(err);
        this.util.setRequests(0);
        this.util.setProgress(false);
        return observableThrowError(err);
      })
    );
  }
  /*
  * handle route for the error codes 404, 403, and 500
  */
  handleRoute(err) {
    if (err.status === 401) {
      err.message = 'Please log in.';
    } else if (err.status === 403) {
      localStorage.removeItem('showLoggedIn');
      localStorage.removeItem('requestingUrl');
      this.router.navigate(['/' + status]);
      err.message = 'Access denied.';
    } else if (err.status === 404) {
      localStorage.removeItem('showLoggedIn');
      localStorage.removeItem('requestingUrl');
      this.router.navigate(['/' + status]);
      err.message = 'The requested application is not found.';
    } else if (err.status === 0) {
      localStorage.setItem('requestingUrl', window.location.pathname);
      localStorage.removeItem('showLoggedIn');
      this.router.navigate(['/500']);
    }
  }
}
