import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { ErrorService} from 'src/app/core/services/error.service';
import { environment } from 'src/environments/local';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private platform: Platform,
    private errorService: ErrorService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addHeader(request);
    this.errorService.errorType.next(null);
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      return throwError(err);
    }));
  }

  private addHeader(req: HttpRequest<any>) {
    let headers = new HttpHeaders();
    headers = headers.append('Cache-Control', 'no-cache');
    headers = headers.append('X-API', 'v1.0');
    headers = headers.append('X-API-HOST', `App.Arena.Apparel.${this.checkPlatform()}`);
    req = req.clone({
      url: environment.apiUrl + req.url,
      headers
    });
    return req;
  }

  checkPlatform() {
    if (this.platform.is('desktop')) {
      return 'Web';
    }
    if (this.platform.is('ios')) {
      return 'iOS';
    }
    if (this.platform.is('android')) {
      return 'Android';
    }
    return 'Web';
  }
}
