import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {BottomNavComponent} from './components/bottom-nav/bottom-nav.component';
import {BottomNavButtonComponent} from './components/bottom-nav-button/bottom-nav-button.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    BottomNavComponent,
    BottomNavButtonComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatRippleModule,
    MatToolbarModule,
    RouterModule,
  ],
  exports: [
    BottomNavComponent,
  ]
})
export class BottomNavModule {
}