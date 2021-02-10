import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BottomNavItem } from './shared/ngx-bottom-nav/models/bottom-nav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showBottomNav: boolean = true;

  public items: BottomNavItem[] = [
    { icon: 'search', label: 'Nearby', routerLink: "home", routerLinkParams: ["home"] },
    { icon: 'view_list', label: 'Bookings', routerLink: "bookings", routerLinkParams: ["bookings"] },
    { icon: 'settings', label: 'Settings', routerLink: "settings", routerLinkParams: ["settings"] },
    { icon: 'notifications', label: 'Notifications', routerLink: "notifications", routerLinkParams: ["notifications"] }
  ]

  title = 'BaggageTransferUI';

  route: string = "";

  hideNavigationUrls = ["/login", "/signup"];

  constructor(router: Router) {

    router.events.subscribe((val) => {

      if (val instanceof NavigationEnd) {

        console.log(val.url);

        console.log(this.hideNavigationUrls.findIndex(v => v === val.url));

        this.showBottomNav = this.hideNavigationUrls.findIndex(v => v === val.url) < 0;

        console.log(this.showBottomNav);
      }

    });
  }
}
