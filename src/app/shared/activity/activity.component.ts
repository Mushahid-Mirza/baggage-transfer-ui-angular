import { Component, OnInit, Input, } from '@angular/core'; 


@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'], 
})
export class ActivityComponent {

  @Input()
  isLoading: boolean = false;

  constructor() { }
 
}
