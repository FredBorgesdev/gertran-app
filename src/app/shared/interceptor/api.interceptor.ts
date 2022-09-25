import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys-deep';
import decamelizeKeys from 'decamelize-keys-deep';
import Cookie from 'js-cookie';
import {GERTRAN_WEB_TOKEN} from '../../authentication/authentication.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  isFormData(request: HttpRequest<unknown>): boolean {
    return request.body instanceof FormData;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${Cookie.get(GERTRAN_WEB_TOKEN)}`,
    });
    const apiReq = request.clone({
      url: `${environment.apiUrl}/${request.url}/`,
      body: this.isFormData(request) ? request.body : decamelizeKeys(request.body),
      headers,
    });

    return next.handle(apiReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (Array.isArray(event.body)) {
            return event.clone({ body: event.body.map(camelcaseKeys) });
          } else {
            return event.clone({ body: camelcaseKeys(event.body) });
          }
        }
      })
    );
  }
}
