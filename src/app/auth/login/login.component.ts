import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;

    app_name: string = environment.app_name;

    submitted = false;
    returnUrl: string;
    error = '';
    isInvalidAttempt: boolean = false;

    constructor(protected injector: Injector,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService) { super(injector); }

    Register() {
        this.router.navigate(['signup'])
    }

    ngOnInit() {

        super.ngOnInit();

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
            rememberMe: [true]
        })

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }


    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    signUp() {

    }

    forgotpassword() {

    }

    LogIn() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.email.value, this.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(["home"]);
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
