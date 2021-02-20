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
  private activities_get_bookings_url = environment.apiUrl + "activities/get-bookings"; 
  private activities_get_enquiries_url = environment.apiUrl + "activities/get-enquiries"; 
  private activities_remove_current_enquiries_url = environment.apiUrl + "activities/remove-current-enquiries";
  private activities_send_request_url = environment.apiUrl + "activities/send-request"; 
  private activities_get_notifications = environment.apiUrl + "activities/get-notifications"

  constructor(protected apiService: ApiRequestService) {  
  }

  public addActivity(data): Observable<any> {
    return this.apiService.post(this.activities_add_url, data);
  }

  public findUsers(requestData): Observable<any>{
    return this.apiService.post(this.activities_find_user_url, requestData)
  } 

  public getBookings(): Observable<any>{
    return this.apiService.get(this.activities_get_bookings_url);
  }

  public getEnquiries(): Observable<any>{
    return this.apiService.get(this.activities_get_enquiries_url);
  }

  public deleteCurrentEnquiry(): Observable<any>{
    return this.apiService.get(this.activities_remove_current_enquiries_url);
  }

  public sendRequest(data): Observable<any>{
    return this.apiService.post(this.activities_send_request_url, data);
  }

  public getNotifications(): Observable<any>{
    return this.apiService.get(this.activities_get_notifications);
  }
}
