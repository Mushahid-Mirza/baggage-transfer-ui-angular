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
            fullName: ['', Validators.required, Validators.minLength(3)],
            phoneNumber: ['', Validators.required, Validators.minLength(10)],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
            confirm: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
            rememberMe: [true]
        })

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

    LogIn() {
        this.router.navigate(["login"])
    }

    get phoneNumber() {
        return this.signupForm.get('phoneNumber');
    }

    get fullName() {
        return this.signupForm.get('fullName');
    }

    get email() {
        return this.signupForm.get('email');
    }

    get password() {
        return this.signupForm.get('password');
    }
    get confirm() {
        return this.signupForm.get('confirm');
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
        this.authenticationService.signup(
            this.fullName.value, this.phoneNumber.value, this.email.value, this.password.value, this.confirm.value)
            .pipe(first())
            .subscribe(() => {

                setTimeout(() => {
                    this.authenticationService.login(this.email.value, this.password.value)
                        .pipe(first())
                        .subscribe(data => {

                            this.router.navigate(["home"]);
                            this.loading = false;

                        }, error => {

                            setTimeout(() => {
                                this.loading = false;
                            }, 500);
                            this.error = error;
                        });
                });

            }, error => {
                setTimeout(() => {
                    this.loading = false;
                }, 500);
                this.error = error;
            });
    }
}
