import { Component, inject, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import * as atlas from 'azure-maps-control';
import { environment } from 'src/environments/environment';
import { AzureApiServicesService } from 'src/app/services/azure-api-services.service';

import * as geoAtlas from 'src/custom-lib/geo-location/geo-location-control';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivitiesService } from 'src/app/services/activities.service';
import { AuthenticationService } from 'src/app/auth/_services/authentication.service';
import { ResponseObject } from 'src/app/models/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

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

  constructor(public injector: Injector,
    private azureService: AzureApiServicesService,
    private activityService: ActivitiesService) {
    super(injector);

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
      //console.log(JSON.stringify(res));

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

  destination: number[];
  currentLocaition: number[];

  onSearchSelected(locaitonItem) {
    if (locaitonItem != null && locaitonItem.Value != null && locaitonItem.Value.position != null) {

      let _geo = locaitonItem.Value.position;
      this.destination = [_geo.lat, _geo.lon];
    } else {
      this.destination = null;
    }
    //console.log(JSON.stringify(locaitonItem));
  }

  initMap() {

    setTimeout(() => {

      this.getCurrentLocation((geo) => {

        this.map = new atlas.Map('myMap', this.mapOptions);

        this.map.events.add('ready', (e: atlas.MapEvent) => this.onMapReady(e));

      });
    }
      , 500);
  }

  onMapReady(e: atlas.MapEvent) {

    this.map.events.add('ongeolocationsuccess', this.gc, function (arg) {
      console.log(JSON.stringify(arg));
    });

    this.map.events.add('ongeolocationerror', this.gc, function (arg) {
      console.log("error - " + JSON.stringify(arg));
    });

    this.map.controls.add(this.gc, {
      position: atlas.ControlPosition.BottomRight
    });

  }

  getElement(userObject: any) {

    var icon = userObject.requestType == "travel" ? 'directions_bike' : 'card_travel';

    var ele: HTMLElement = document.createElement("div");
    ele.className = "circle";
    ele.innerHTML = '<mat-icon class="mat-icon material-icons">' + icon + '</mat-icon>';
    ele.onclick = () => {
      this.clicked(userObject.userId);
    }
    return ele;
  }

  getMarker(userObject: any) {

    var marker = new atlas.HtmlMarker({
      color: 'Black',
      htmlContent: this.getElement(userObject),
      position: [userObject.startLat, userObject.startLong],
      popup: new atlas.Popup({
        content: '<div style="padding:10px">Hello World</div>',
        pixelOffset: [0, -30],
      })
    });

    return marker;
  }

  getRequest(callback) {
    var _user = this.auth.currentUserValue;
    this.getCurrentLocation(() => {
      var user = {
        UserId: _user["userName"],
        StartGeo: this.currentLocaition,
        EndGeo: this.destination,
        ActiveTillHours: parseInt(this.selectedHour),
        ActiveTillMinutes: parseInt(this.selectedMinute),
      }
      if (callback) callback(user);
    });

  }

  addRequest(type: "travel" | "baggage") {

    if (this.destination != null && this.selectedHour != "-1" && this.selectedMinute != "-1") {

      this.getRequest((request) => {

        request.RequestType = type;

        this.loading = true;

        this.activityService.addActivity(request).subscribe((res: ResponseObject) => {

          this.loading = false;

          this.showMessageBox("Request Added", res.message, "Ok").subscribe(res => {

            this.findUsers(type);

          });
        })
      })
    } else {

      this.snackBar.open("Please select the destination & timings", null, { duration: 2000, verticalPosition: "bottom" });
    }
  }

  findUsers(type: "travel" | "baggage") {
    var requestData = {
      ReqquestType: type, Start: this.currentLocaition,
      Destination: this.destination, UserId: this.auth.currentUserValue["userName"]
    };
    this.activityService.findUsers(requestData).subscribe((res: ResponseObject) => {
      this.showMessageBox("We've searched for you!", res.message, "Ok");
      this.addUsersInmarkers(res.data, type);
    })
  }

  addUsersInmarkers(users: any[], type: "baggage" | "travel") {

    if (users != null && users.length > 0) {
      users.forEach(item => {
        item.type = type;
        this.map.markers.add(this.getMarker(item));
      })
      var usr = users[0];
      var geoCode = [usr.startLat, usr.startLong];
      this.map.setCamera({
        center: geoCode
      })
    }
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

        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        this.currentLocaition = [lat, lon];

        if (cb) cb();
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