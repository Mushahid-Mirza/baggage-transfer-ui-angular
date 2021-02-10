import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum DrawerFor {
    Navigation = 1,
}

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptorService {
 
    public httpErrorOccurred = new Subject<string>();

    public httpError$ = this.httpErrorOccurred.asObservable();

}
