import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AzureApiServicesService {

  constructor(private http: HttpClient) {
  }

  getAzureData(url, json): Observable<any> {

    let _headers = new HttpHeaders()
      // .set("Authorization", 'Bearer ' + environment.azureAuthorization)
      .set("X-ms-client-id", environment.azureClientId);

    return this.http.get<any>(url, { params: json,  headers: _headers });
  }
}
