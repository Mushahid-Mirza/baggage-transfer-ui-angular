import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-adhaar',
  templateUrl: './my-adhaar.component.html',
  styleUrls: ['./my-adhaar.component.scss']
})
export class MyAdhaarComponent implements OnInit {

  title: string = "My Adhaar";

  constructor() { }

  aadharInfo: any;

  ngOnInit(): void {

  }

  uploadAadhar(): void {
    this.aadharInfo = { image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/A_sample_of_Aadhaar_card.jpg" }
  }
}
