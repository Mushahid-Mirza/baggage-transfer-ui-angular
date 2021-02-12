import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorInterceptorService } from 'src/app/shared/services/error-interceptor.service';
import { Result } from 'src/app/shared/base.component';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService,
        private _router: Router,
        private errorIntrcptr: ErrorInterceptorService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(this.handleError<any>()))
    }

    private handleError<T>(operation = 'operation', result?: T) {

        return (error: any): Observable<T> => {
 

            if (error.status === 401) {

                this.authenticationService.logout();

                this._router.navigate(['/login']);

                setTimeout(() => {
                    this.errorIntrcptr.httpErrorOccurred.next("Please Login Again");
                }, 1500);
            }
            else if (error.status == 400) {
                let msg = "The request is Invalid";
                if(error.error != null 
                    && error.error.message != null 
                    && error.error.message.trim() != ""){
                        
                    msg = error.error.message;
                } else if(error.error.error_description != null){
                    msg = error.error.error_description;
                }
                this.errorIntrcptr.httpErrorOccurred.next(msg);
            }
            else if (error.status == 500) {
                this.errorIntrcptr.httpErrorOccurred.next("Error occurred in the server");
            } 
            else if (error.status == 0) {
                this.errorIntrcptr.httpErrorOccurred.next("Unable to connect the server");
            }
            else {
                this.errorIntrcptr.httpErrorOccurred.next("Unknown Error");
            }

            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }
}