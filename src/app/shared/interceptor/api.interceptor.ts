import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import {catchError, map, mergeMap, retryWhen} from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys-deep';
import decamelizeKeys from 'decamelize-keys-deep';
import Cookie from 'js-cookie';
import {AuthenticationService, GERTRAN_CUSTOMER_ID, GERTRAN_WEB_TOKEN} from '../../authentication/authentication.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  isFormData(request: HttpRequest<unknown>): boolean {
    return request.body instanceof FormData;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({
      url: `${environment.apiUrl}/${request.url}/`,
      body: this.getBody(request),
      headers: this.getHeaders(request.url),
    });

    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === 401
          && ['auth/jwt/verify', 'auth/jwt/refresh'].indexOf(request.url) === -1
        ) {
          return this.authService.refreshObservable().pipe(
            mergeMap(
              () => {
                return next.handle(apiReq.clone({
                  headers: this.getHeaders(apiReq.url),
                }));
              }
            ));
        } else {
          return throwError(error);
        }
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (Array.isArray(event.body)) {
            return event.clone({ body: event.body.map(camelcaseKeys) });
          } else {
            return event.clone({ body: camelcaseKeys(event.body) });
          }
        }
      }),
    );
  }

  private getHeaders(url?: string): HttpHeaders {
    const headers: any = {};
    if (Cookie.get(GERTRAN_WEB_TOKEN)) {
      headers.authorization = `Bearer ${Cookie.get(GERTRAN_WEB_TOKEN)}`;
    }
    if (
      Cookie.get(GERTRAN_CUSTOMER_ID) &&
      this.modulesWithoutCustomerKey.some(module => !url.includes(module))
    ) {
      headers['X-Customer-Key'] = Cookie.get(GERTRAN_CUSTOMER_ID);
    }
    return new HttpHeaders(headers);
  }

  private getBody(request: HttpRequest<any>): any {
    return this.isFormData(request) ? request.body : decamelizeKeys(request.body);
  }

  private get modulesWithoutCustomerKey(): string[] {
    return [
      'customers'
    ];
  }
}
