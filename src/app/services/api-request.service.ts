import { Injectable, Injector } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { ErrorInterceptorService } from "../services/error-interceptor.service";
import { ResponseObject, Result } from "../models/common";

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  protected http: HttpClient;
  protected errorIntrcptr: ErrorInterceptorService;

  private asyncStatus: Subject<boolean> = new Subject<boolean>();
  public onAsyncStatus$: Observable<boolean> = this.asyncStatus.asObservable();

  private onMessaged: Subject<ResponseObject> = new Subject<ResponseObject>();
  public onMessage$: Observable<ResponseObject> = this.onMessaged.asObservable();

  constructor(protected injector: Injector) {

    this.http = injector.get(HttpClient);
    this.errorIntrcptr = injector.get(ErrorInterceptorService);

    
    this.errorIntrcptr.httpError$.subscribe(res => {
      console.log(JSON.stringify(res));
        this.asyncStatus.next(false);
        this.onMessaged.next({ message: res, result: Result.Error }); 
      return throwError(res);
  })
  }

  public post(url: string, data: any): Observable<any> {

    this.asyncStatus.next(true);

    return this.http.post<ResponseObject>(url, data).pipe(map(res => {

      this.asyncStatus.next(false);
      this.onMessaged.next(res);
      return res;
    }, catchError(err => {
      return throwError(err);
    })));
  }

  private mapUrlWithQueryString(url: string, data?: any) {

    if (data) {

      let params = new URLSearchParams();

      for (let key in data) {
        params.set(key, data[key])
      }

      url = url
        + ((url.indexOf("?") < 0 || url.indexOf("?") == url.length - 1) ? "?" : "&")
        + params.toString();
    }

    console.log("Url: " + url);
    return url;
  }

  
  public delete(url: string, data?: any): Observable<any> {

    this.asyncStatus.next(true);
    url = this.mapUrlWithQueryString(url, data);

    this.asyncStatus.next(true);

    return this.http.delete<ResponseObject>(url).pipe(map(res => {

      this.asyncStatus.next(false);
      this.onMessaged.next(res);

      return res;
    }, catchError(err => {
      return throwError(err);
    })));
  }

  public get(url: string, data?: any): Observable<any> {

    this.asyncStatus.next(true);
    url = this.mapUrlWithQueryString(url, data);

    this.asyncStatus.next(true);

    return this.http.get<ResponseObject>(url).pipe(map(res => {

      this.asyncStatus.next(false);
      this.onMessaged.next(res);

      return res;
    }, catchError(err => {
      return throwError(err);
    })));
  }
}
