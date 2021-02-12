import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<any> { 

        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        let body = new HttpParams();
        body = body.set('UserName', username);
        body = body.set('Password', password);
        body = body.set('grant_type', "password");
        //return of({});
        return this.http.post<any>(`${environment.appAuthUrl}`, body, {
            headers: myheader
        }).pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
    }

    signup(username: string, password: string, confirm: string): Observable<any> {

        return this.http.post<any>(`${environment.apiUrl}/auth/register`, { "Email": username, "Password": password, "ConfirmPassword": confirm })
            .pipe(map(user => {
                 localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() { 
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null); 
    }
}
