import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/_services/user.service';
import { ResponseObject } from 'src/app/models/common';
import { BaseComponent } from 'src/app/shared/base.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent extends BaseComponent implements OnInit {

  title: string = "My Profile";

  submitted: boolean = false;

  userInfo: any = {};

  saveForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    address: ['', Validators.required]
  })

  public get phoneNumber(){
    return this.saveForm.get("phoneNumber");
  }

  public get fullName(){
    return this.saveForm.get("fullName");
  }

  public get dateOfBirth(){
    return this.saveForm.get("dateOfBirth");
  }

  public get address(){
    return this.saveForm.get("address");
  }

  isEditMode: boolean = false;

  constructor(protected injector: Injector,
    private userService: UserService) {
    super(injector);
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getCurrentUserDetails(true).subscribe((res) => {
      this.loading = false;
      this.userInfo = res;
    }, error => {
      this.loading = false;
    })
  }

  logout() {
    this.router.navigate(['login']);
  }

  editMode() {
    this.isEditMode = true;
    this.saveForm.reset();
    this.saveForm.patchValue(this.userInfo);
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  save() {
    setTimeout(() => {
      //this.loading = true;
      this.userService.saveUserDetails(this.saveForm.value).subscribe((res: ResponseObject) => {
        this.isEditMode = false;
        //this.saveForm.reset();
        //this.loading = false;
      });
    });
  }
}
