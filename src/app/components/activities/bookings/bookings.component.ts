import { Component, Injector, OnInit } from '@angular/core';
import { ResponseObject } from 'src/app/models/common';
import { ActivitiesService } from 'src/app/services/activities.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent extends BaseComponent implements OnInit {

  title: string = "My Bookings";

  constructor(protected injector: Injector, 
    private activityService: ActivitiesService) { 
    super(injector);
  }

  requests: any[] = [{
    name: "Mr ABC",
    price: 250,
  },
  {
    name: "Mister Z",
    price: 150
  }
  ]

  activeBookings: any[] = [{
    name: "Mr Sharma",
    price: 200,
  }]

  previousBookings: any[] = [{ name: "John Doe", price: 230 }, { name: "Mister X", price: 150 }]


  activeTravels: any[] = [{}]
  previousTravels: any[] = []


  ngOnInit(): void {
    this.activityService.getBookings().subscribe((res: ResponseObject) => {
      
      console.log(JSON.stringify(res));
    });
  }

}
