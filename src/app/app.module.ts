import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { Role } from './auth/_models/role';
import { RoleGuard } from './auth/_helpers/role.guard';
import { ErrorInterceptor } from './auth/_helpers/error.interceptor';
import { JwtInterceptor } from './auth/_helpers/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent, UserLocationDetailsPopup } from './components/activities/home/home.component';
import { ProfilesComponent } from './components/activities/profiles/profiles.component';
import { BookingsComponent } from './components/activities/bookings/bookings.component';
import { SettingsComponent } from './components/activities/settings/settings.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NotificationsComponent } from './components/activities/notifications/notifications.component';
import { MyAdhaarComponent } from './components/activities/my-adhaar/my-adhaar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfilesComponent,
    BookingsComponent,
    SettingsComponent,
    SignUpComponent,
    NotificationsComponent,
    MyAdhaarComponent, UserLocationDetailsPopup,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoic2F1YmFuc2FkYSIsImEiOiJja2tsbWZwYmswZmNlMnhycW5jODE0YnpkIn0.nf81SwZwE4gWPS1OA4potg', // Optional, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'pk.eyJ1Ijoic2F1YmFuc2FkYSIsImEiOiJja2tsbWZwYmswZmNlMnhycW5jODE0YnpkIn0.nf81SwZwE4gWPS1OA4potg'
    }),
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent, canActivate: [RoleGuard],
        data: { roles: [Role.User] }
      },
      {
        path: '', component: HomeComponent, canActivate: [RoleGuard],
        data: { roles: [Role.User] }
      },
      {
        path: 'settings', component: SettingsComponent, canActivate: [RoleGuard],
        data: { roles: [Role.User] }
      },
      {
        path: 'profiles', component: ProfilesComponent, canActivate: [RoleGuard],
        data: { roles: [Role.User] }
      },
      {
        path: 'notifications', component: NotificationsComponent, canActivate: [RoleGuard],
        data: { roles: [Role.User] }
      },
      {
        path: 'bookings', component: BookingsComponent, canActivate: [RoleGuard],
        data: { roles: [Role.User] }
      },
      {
        path: 'my-adhaar', component: MyAdhaarComponent, canActivate: [RoleGuard],
        data: { roles: [Role.User] }
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'signup', component: SignUpComponent
      },
      {
        path: 'logout', component: LogoutComponent, canActivate: [RoleGuard],
        data: { roles: [Role.User] }
      },
    ], { useHash: false }),
  ],

  entryComponents: [
    UserLocationDetailsPopup
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }