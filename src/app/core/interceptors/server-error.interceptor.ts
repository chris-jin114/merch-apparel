import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { ErrorService } from 'src/app/core/services/error.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private errorService: ErrorService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
        this.errorService.errorType.next('server');
        return throwError(err);
      }
    ));
  }
}
