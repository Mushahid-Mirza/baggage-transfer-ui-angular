import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  title: string = "My Bookings";

  constructor() { }

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
  }

}
