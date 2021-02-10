import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  title: string = "My Profile";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Logout() {
    this.router.navigate(['login']);
  }
}
