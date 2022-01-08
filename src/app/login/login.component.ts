import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Login} from './login'
import {LoginService} from "./login.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  fieldTextType: boolean;
  isLoading: boolean;
  login: Login;
  firstName: string;

  allowAccess: boolean;
  loginForm: FormGroup;
  submitted = false;
  showErrorMsg: boolean;
  role: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    localStorage.clear();
    this.isLoading = false;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.login = new Login();
  }

  onSubmit(): void {
    this.isLoading = true;
    this.submitted = true;
    this.login.dsUsername = this.loginForm.controls.username.value;
    this.login.password = this.loginForm.controls.password.value;
    this.loginService.findLogin(this.login).subscribe(data => {
      if (data !== null) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', data.dsUsername);
        localStorage.setItem('role', data.role);
          this.router.navigate(["/lab"]);
          this.router.navigate(["/lab"]);
      } else {
        this.snackBar.open('Invalid username or password. Please, try again.' , 'Close' , {
          duration: 10000,
          panelClass: ['login-snackbar']
        });
      }
    })
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
