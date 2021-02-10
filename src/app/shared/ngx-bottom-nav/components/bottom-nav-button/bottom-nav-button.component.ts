import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-bottom-nav-button',
  templateUrl: './bottom-nav-button.component.html',
  styleUrls: ['./bottom-nav-button.component.scss']
})
export class BottomNavButtonComponent {

  @Output()
  event: EventEmitter<any>;
  /**
   * Determines whether labels of inactive buttons are hidden.
   */
  @Input() public hideLabel: boolean;

  /**
   * The icon which is shown on this button.
   */
  @Input() public icon: string;

  /**
   * The label which is shown on this button.
   */
  @Input() public label: string;

  Clicked() {
    if (this.event != null)
      this.event.next();
  }
}