import { FormBuilder, FormGroup } from "@angular/forms";
import { OnDestroy, OnInit, Injector, Directive, Component } from "@angular/core";
import { ErrorInterceptor } from "../auth/_helpers/error.interceptor";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, of, Subscription } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ErrorInterceptorService } from "./services/error-interceptor.service";
import { Router } from "@angular/router";

export enum Result {
    ValidationError = 1,
    Success = 2,
    Failure = 3,
    Error = 4
}

@Component({
    template: ''
})
export class BaseComponent implements OnInit, OnDestroy {

    protected subscription: Subscription;

    protected hasBottomNavigation: boolean = true;

    protected baseUrl: string = environment.apiUrl;

    loading: boolean = false;

    protected fb: FormBuilder;
    protected snackBar: MatSnackBar;
    protected http: HttpClient;
    protected router: Router;
    protected errorIntrcptr: ErrorInterceptorService;

    constructor(protected injector: Injector) {

        this.fb = injector.get(FormBuilder);
        this.snackBar = injector.get(MatSnackBar);
        this.http = injector.get(HttpClient);
        this.router = injector.get(Router);
        this.errorIntrcptr = injector.get(ErrorInterceptorService);
    }

    protected post<T>(url: string, data: any): Observable<any> {

        this.loading = true;

        return this.http.post<T>(url, data).pipe(map(res => {
            this.loading = false;
            this.showMessage(res);
            return res;
        }, error => {
            this.loading = false;
            this.showMessage(error);
            return error;
        }));
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

    protected get<T>(url: string, data?: any): Observable<any> {

        url = this.mapUrlWithQueryString(url, data);

        this.loading = true;

        return this.http.get<any>(url).pipe(map(res => {
            this.loading = false;
            this.showMessage(res);
            return res;
        }, error => {
            this.loading = false;
            this.showMessage(error);
            return error;
        }));
    }

    showMessage(res) {
        if (res.message != null && res.message.trim() != "") {
            this.snackBar.open(res.message, "",
                {
                    duration: 3000,
                    panelClass: res.result == Result.Success ? ['snack-success']
                        : res.result == (Result.Failure | Result.ValidationError) ? ['snack-warning']
                            : res.result == Result.Error ? ['snack-danger']
                                : []
                });
        }
    }

    resetForm(form: FormGroup) {
        form.reset();
        form.markAsPristine();
        form.markAsUntouched();
    }

    ngOnInit() {
        console.log("Subscribing the Interceptor");
        this.subscription = this.errorIntrcptr.httpError$.subscribe(res => {
            this.loading = false;
            this.showMessage({ message: res, result: Result.Error });
        })
    }

    ngOnDestroy() {
        if (this.subscription) {
            console.log("UnSubscribing the Interceptor")
            this.subscription.unsubscribe();
        }
        this.fb = null;
        this.snackBar = null;
        this.http = null;
        this.router = null;
        this.errorIntrcptr = null;
    }


}