import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/core/services/error.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

    constructor(
        private errorService: ErrorService,
        private ngZone: NgZone
    ) { }

    handleError(error) {
        if (error instanceof HttpErrorResponse) {
            // Server Error
            this.ngZone.run(() => {
                this.errorService.errorType.next('server');
            });
        } else {
            // Client Error
            this.ngZone.run(() => {
                this.errorService.errorType.next('client');
                this.errorService.setErrorMsg(error.message ? error.message : error.toString());
            });
        }
        console.error(error);
    }
}
