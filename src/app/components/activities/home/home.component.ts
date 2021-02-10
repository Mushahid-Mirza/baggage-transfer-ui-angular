import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import * as atlas from 'azure-maps-control';
import { environment } from 'src/environments/environment';
import { AzureApiServicesService } from 'src/app/services/azure-api-services.service';

import * as geoAtlas from 'src/custom-lib/geo-location/src';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mapOptions: any = {
    center: [-122.33, 47.6],
    zoom: 17,
    height: '100%',
    language: 'en-US',
    authOptions: {
      authType: atlas.AuthenticationType.subscriptionKey,
      subscriptionKey: environment.azureMapAuthOptions.subscriptionKey,
    }
  }

  suggestionList: any[] = [];

  gc = new geoAtlas.control["GeolocationControl"]({
    style: 'auto'
  });

  @ViewChild("element") ele: HTMLElement;

  title: string = "Search Nearby";

  map: atlas.Map;

  constructor(private azureService: AzureApiServicesService, public dialog: MatDialog,
    public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

  }

  selectedHour: string = "-1";
  selectedMinute: string = "-1";

  onSearch(searchKey) {
    let url = environment.azureLocationSearchUrl;
    let data = {
      format: 'json', query: searchKey,
      "subscription-key": environment.azureMapAuthOptions.subscriptionKey
    };
    this.azureService.getAzureData(url, data).subscribe(res => {
      console.log(JSON.stringify(res));

      var res = res.results;
      var suggestions = [];
      res.forEach(ele => {
        suggestions.push({
          Text: ele.address.freeformAddress,
          Value: ele,
        })
      });
      this.suggestionList = suggestions;
    });
  }

  onSearchSelected(location) {

  }

  initMap() {

    setTimeout(() => {

      this.getCurrentLocation(() => {

        this.map = new atlas.Map('myMap', this.mapOptions);

        this.map.events.add('ready', (e: atlas.MapEvent) => this.onMapReady(e));

      });
    }
      , 500);
  }

  onMapReady(e: atlas.MapEvent) {

    this.map.events.add('ongeolocationsuccess', this.gc, function (arg) {
    });

    this.map.events.add('ongeolocationerror', this.gc, function (arg) {
    });

    this.map.controls.add(this.gc, {
      position: atlas.ControlPosition.BottomRight
    });

  }

  getElement(userObject: any) {

    var icon = userObject.type == "travel" ? 'directions_bike' : 'card_travel';

    var ele: HTMLElement = document.createElement("div");
    ele.className = "circle";
    ele.innerHTML = '<mat-icon class="mat-icon material-icons">' + icon + '</mat-icon>';
    ele.onclick = () => {
      this.clicked(userObject.id);
    }
    return ele;
  }

  getMarker(userObject: any) {

    var marker = new atlas.HtmlMarker({
      color: 'Black',
      htmlContent: this.getElement(userObject),
      position: userObject.geoCode,
      popup: new atlas.Popup({
        content: '<div style="padding:10px">Hello World</div>',
        pixelOffset: [0, -30],
      })
    });

    return marker;
  }

  findNearbyBaggage() {

    this.map.markers.clear();

    if (this.selectedHour != "-1" && this.selectedMinute != "-1") {

      var users = [{
        name: "Harry Peter",
        geoCode: [74.55531, 13.98524], id: "bkl", type: "baggage",
        amount: 200,
        startAddress: "Marthalli", destinatin: "Electronic City"
      }, {
        name: "Tom William",
        geoCode: [74.54431, 13.9553], id: "bkl 2", type: "baggage",
        amount: 200,
        startAddress: "Marthalli", destinatin: "Electronic City"
      }];
      this.mapOptions.center = users[0].geoCode

      this.addUsersInmarkers(users);
    } else {

      this.snackBar.open("Please select the timings", null, { duration: 2000, verticalPosition: "bottom" });
    }
  }

  findNearbyTravelers() {

    this.map.markers.clear();

    if (this.selectedHour != "-1" && this.selectedMinute != "-1") {

      var users = [{
        name: "John Doe",
        geoCode: [74.55531, 13.98534], id: "bkl", type: "travel",
        amount: 200,
        startAddress: "Marthalli", destinatin: "Electronic City"
      }, {
        name: "John Locke",
        geoCode: [74.54431, 13.9843], id: "bkl 2", type: "travel",
        amount: 200,
        startAddress: "Marthalli", destinatin: "Electronic City"
      }];


      this.addUsersInmarkers(users);
    } else {
      this.snackBar.open("Please select the timings", null, { duration: 2000, verticalPosition: "bottom" })
    }
  }

  addUsersInmarkers(users: any[]) {

    users.forEach(item => {
      this.map.markers.add(this.getMarker(item));
    })
    this.map.setCamera({
      center: users[users.length - 1].geoCode
    })
  }

  clicked(userObj) {

    const dialogRef = this.dialog.open(UserLocationDetailsPopup, {
      restoreFocus: false,
      width: '250px',
      data: { name: userObj.name, amount: userObj.amount, startLocation: userObj.startAddress, destination: userObj.destination, type: userObj.type }
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => {
      //alert('closed');
    });

  }

  getCurrentLocation(cb) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.mapOptions.center[0] = position.coords.longitude;
        this.mapOptions.center[1] = position.coords.latitude;

        cb();
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}


@Component({
  selector: 'user-location-details',
  templateUrl: 'user-location-details.html',
})
export class UserLocationDetailsPopup {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, amount: number, startLocation: string, destination: string, type: string }) { }
}