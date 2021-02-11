import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})

export class ActivitiesService {
 

  private activities_add_url = environment.apiUrl + "activities/add-enquiry"; 
  private activities_find_user_url = environment.apiUrl + "activities/find-users"; 

  constructor(protected apiService: ApiRequestService) {  
  }

  public addActivity(data): Observable<any> {
    return this.apiService.post(this.activities_add_url, data);
  }

  public findUsers(requestData): Observable<any>{
    return this.apiService.post(this.activities_find_user_url, requestData)
  } 
}
