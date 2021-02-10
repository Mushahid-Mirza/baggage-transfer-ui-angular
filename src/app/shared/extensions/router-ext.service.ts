import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RouterExtService {

    private previousUrl: string = undefined;
    private currentUrl: string = undefined;

    private searchNavigatingSource = new Subject<boolean>();
    searchNavigated$ = this.searchNavigatingSource.asObservable();


    constructor(private router: Router) {
        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            }
            if (this.router.url.indexOf("search") > 0) {
                this.searchNavigatingSource.next(true);
            } else {
                this.searchNavigatingSource.next(false);
            }
        });
    }

    clearPreviousUrl() {
        this.previousUrl = "";
        this.previousUrl = null;
    }

    public getPreviousUrl() {
        return this.previousUrl;
    }

}
