import { Component, Inject, Injector, OnInit } from '@angular/core';
import { ResponseObject } from 'src/app/models/common';
import { ActivitiesService } from 'src/app/services/activities.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends BaseComponent implements OnInit {

  title: string = "Notifications";
  
  requests: any[] = [{
    
    type: "baggage",
    name: "Mr ABC",
    price: 250,
  },
  {
    thpe: "trave",
    name: "Mister Z",
    price: 150
  }]
  
  constructor(protected injector: Injector, protected activityService: ActivitiesService) { 
    super(injector);
  }

  ngOnInit(): void {
    this.activityService.getNotifications().subscribe((res: ResponseObject) => {
      console.log(JSON.stringify(res));
    })
  }

}
