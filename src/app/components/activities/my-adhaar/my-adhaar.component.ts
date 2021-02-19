import { HttpHeaders } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { ResponseObject } from 'src/app/models/common';
import { BaseComponent } from 'src/app/shared/base.component';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../auth/_services/user.service';

@Component({
  selector: 'app-my-adhaar',
  templateUrl: './my-adhaar.component.html',
  styleUrls: ['./my-adhaar.component.scss']
})
export class MyAdhaarComponent extends BaseComponent implements OnInit {

  title: string = "My Adhaar";
  defaultUrl: string = "/assets/aadhar_copy.jpg";
  isUploading: boolean = false;

  constructor(protected userService: UserService, protected injector: Injector) {
    super(injector);
    this.aadharInfo = {
      url: this.defaultUrl + ""
    };
  }

  aadharInfo: any;
  file: File;

  ngOnInit(): void {
    this.loading = true;
    this.userService.getCurrentUserDetails(true).subscribe((res) => {
      this.loading = false;
      this.aadharInfo.url = environment.baseUrl + res.aadharUrl;
    }, error => {
      this.loading = false;
    })
    //this.aadharInfo.url = environment.baseUrl +  "Storage/Uploads/Images/78a8a349d3534474b82d1c0158ca1f3a.PNG"
  }

  uploadAadhar(): void {

    const formData = new FormData();
    this.loading = true;
    formData.append("Aadhar", this.file, this.file.name);
    var _headers = new HttpHeaders();
    //Content-Type: application/json
    _headers.set("Content-Type", "application/json");
    this.post(environment.apiUrl + 'activities/upload-aadhar', formData, _headers).subscribe((res : ResponseObject) => {
      this.loading = false;
      this.isUploading = false;
    });
  }

  importFile(event) {
    this.isUploading = true;

    if (event.target.files.length == 0) {
      console.log("No file selected!");
      return
    }
    let file: File = event.target.files[0];
    this.file = file
    this.aadharInfo.url = URL.createObjectURL(file);

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.aadharInfo.url = reader.result;
    }
    // after here 'file' can be accessed and used for further process
  }
}
