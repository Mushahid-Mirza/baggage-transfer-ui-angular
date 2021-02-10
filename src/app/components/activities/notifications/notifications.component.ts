import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

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
  
  constructor() { }

  ngOnInit(): void {
  }

}
