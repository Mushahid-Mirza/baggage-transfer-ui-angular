import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/_services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  title: string = "Settings";

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  Logout() {

    this.authService.logout();

    this.router.navigate(["login"]);

  }

}
