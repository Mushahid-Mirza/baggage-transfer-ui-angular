import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(private router: Router, private _authService: AuthenticationService) {

    }

    ngOnInit() {
        // this._authService.logout().subscribe(() => {
        //     this.router.navigate(['/login']);
        // });
    }

}
