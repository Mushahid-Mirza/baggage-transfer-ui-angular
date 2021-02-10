import { NgModule } from '@angular/core';
import { SidenavCommonComponent } from './sidenav-common/sidenav-common.component';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { NotFoundComponent } from './not-found/not-found.component';
import { ActivityComponent } from './activity/activity.component';
import { LayoutComponent } from './layout/layout.component';
import { CustomCalendarHeaderComponent } from './calendar/custom-header/custom-calendar-header.component';
import { environment } from 'src/environments/environment.prod';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BottomNavModule } from './ngx-bottom-nav/bottom-nav.module';
import { LoginComponent } from '../auth/login/login.component';
import { LogoutComponent } from '../auth/logout/logout.component';
import { RepeatPasswordEStateMatcher, RepeatPasswordValidator } from './validators/password-validator';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    SidenavCommonComponent,
    NotFoundComponent,
    ActivityComponent,
    LayoutComponent,
    CustomCalendarHeaderComponent,
    LoadSpinnerComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [

    CommonModule,

    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatRippleModule,
    MatCheckboxModule,
    MatToolbarModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatBadgeModule,
    MatExpansionModule,
    MatTabsModule,
    MatSelectModule,
    MatRippleModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    BottomNavModule,
    MatDialogModule
    // NgQrScannerModule,
    // QRCodeModule,
  ],
  exports: [
    ActivityComponent,

    CommonModule,

    LayoutComponent,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatGridListModule,
    MatBadgeModule,
    MatRippleModule,
    MatExpansionModule,
    MatRippleModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatNativeDateModule,
    // NgQrScannerModule,
    // QRCodeModule,
    MatDatepickerModule,
    CustomCalendarHeaderComponent,

    ReactiveFormsModule,
    BottomNavModule,

    LoadSpinnerComponent,
    SidenavCommonComponent,

    FormsModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class SharedModule { }
