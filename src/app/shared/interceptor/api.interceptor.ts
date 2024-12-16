import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError, map, mergeMap, retryWhen} from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys-deep';
import decamelizeKeys from 'decamelize-keys-deep';
import Cookie from 'js-cookie';
import {
  AuthenticationService,
  GERTRAN_CUSTOMER_ID,
  GERTRAN_WEB_TOKEN
} from '../../authentication/authentication.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  modulesWithoutCustomerKey: string[] = ['customers'];
  endpointsToAddCustomerHeader: string[] = ['insurance-companies/customers'];

  constructor(private authService: AuthenticationService) {
  }

  isFormData(request: HttpRequest<unknown>): boolean {
    return request.body instanceof FormData;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let path;
    if (request.url.includes('http')) {
      path = request.url;
    } else {
      path = `${environment.apiUrl}/${request.url}/`;
    }

    const apiReq = request.clone({
      url: path,
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
            ),
            catchError(() => {
              this.authService.logout();
              return throwError(error);
            })
          );
        } else {
          return throwError(error);
        }
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (Array.isArray(event.body)) {
            return event.clone({body: event.body.map(camelcaseKeys)});
          } else {
            return event.clone({body: camelcaseKeys(event.body)});
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
      (
        this.modulesWithoutCustomerKey.some(module => !url.includes(module)) ||
        this.endpointsToAddCustomerHeader.some(endpoint => url.includes(endpoint))
      )
    ) {
      headers['X-Customer-Key'] = Cookie.get(GERTRAN_CUSTOMER_ID);
    }
  
    // // Add ngrok-skip-browser-warning header to bypass warning
    // // if (url && url.includes('ngrok.com')) {
    //   headers['ngrok-skip-browser-warning'] = ' s';
    // // }
    // // Set a custom User-Agent to avoid triggering the warning page
    // headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
  
    return new HttpHeaders(headers);
  }

  private getBody(request: HttpRequest<any>): any {
    return this.isFormData(request) ? request.body : decamelizeKeys(request.body);
  }
}
