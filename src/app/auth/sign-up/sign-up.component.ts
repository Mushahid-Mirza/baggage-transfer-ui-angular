import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Role } from '../_models/role';
import { BaseComponent } from 'src/app/shared/base.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends BaseComponent implements OnInit, OnDestroy {


    signupForm: FormGroup;

    app_name: string = environment.app_name;

    submitted = false;
    returnUrl: string;
    error = '';
    isInvalidAttempt: boolean = false;

    constructor(protected injector: Injector,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService) { super(injector); }



    ngOnInit() {

        super.ngOnInit();

        this.signupForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$/)]],
            Confirm: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$/)]],
            rememberMe: [true]
        })

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

    LogIn() {
        this.router.navigate(["login"])
    }

    email() {
        return this.signupForm.get('email');
    }

    password() {
        return this.signupForm.get('password');
    }

    signUp() {

    }

    forgotpassword() {

    }

    SignUp() {
        this.submitted = true;

        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.signup(this.email().value, this.password().value)
            .pipe(first())
            .subscribe(
                data => {

                    if (data.role == Role.User) {
                        this.router.navigate(["home"]);
                    }
                    // else if (data.role == Role.Supplier) {
                    //     this.router.navigate(["supplier"]);
                    // }

                    this.loading = false;
                },
                error => {
                    setTimeout(() => {
                        this.loading = false;
                    }, 500);
                    this.error = error;
                });
    }
}
