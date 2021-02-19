import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRequestService } from '../../services/api-request.service';

import { environment } from '../../../environments/environment';// '../../src/environments/environment';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseObject, Result } from "../../models/common";

@Injectable({ providedIn: 'root' })
export class UserService {
 

    constructor(protected apiService: ApiRequestService) { }

    getCurrentUserDetails(forceLoad?: boolean): Observable<any> {

        if (forceLoad || JSON.parse(localStorage.getItem("userDetails")) == null) {

            return this.apiService.get(`${environment.apiUrl}activities/get-user-details`)
                .pipe(map((res: ResponseObject) => {
                    localStorage.setItem("userDetails", JSON.stringify(res.data));
                    return res.data;
            }));
        }
        else {
            return of(JSON.parse(localStorage.getItem("userDetails")));
        }
    }

    saveUserDetails(data): Observable<any>{
        return this.apiService.post(`${environment.apiUrl}activities/save-user-details`, data);
    }
}