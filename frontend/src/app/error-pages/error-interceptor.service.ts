import { Injectable } from '@angular/core';
import { HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch((err: HttpErrorResponse) => {
      if (this.router.url !== '/login' && err.status === 401) {
        this.router.navigate(['/logout']);
      }
      if (err.status === 404) {
        this.router.navigate(['/404']);
      }
      return Observable.throw(err);
    });
  }
}
