import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.indexOf("https://atlas.microsoft.com") > -1) {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${environment.azureAuthorization}`
                }
            });
        } else if (request.url.indexOf("token") < 0) {
            let currentUser = this.authenticationService.currentUserValue;

            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
            }
        } else {// ${currentUser.token}`,
            request = request.clone({
                setHeaders: { 
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                    // 'Access-Control-Allow-Origin': '*',
                    //"Accept": "*/*"
                }
            });

        }
        return next.handle(request);
    }
}