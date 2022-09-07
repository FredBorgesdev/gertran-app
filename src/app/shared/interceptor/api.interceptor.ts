import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys-deep';
import decamelizeKeys from 'decamelize-keys-deep';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  isApplicationJson(request: HttpRequest<unknown>) {
    return request.headers.get('Content-Type') === 'application/json';
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({
      url: `${environment.apiUrl}/${request.url}/`,
      body: this.isApplicationJson(request) ? decamelizeKeys(request.body) : request.body
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
