import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Login} from './login'
import {LoginService} from "./login.service";

// import {AppService} from "../app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public redirectUrl: string;
  fieldTextType: boolean;
  isLoading: boolean;
  login: Login;
  firstName: string;


  allowAccess: boolean;
  loginForm: FormGroup;
  submitted = false;
  isSet = false;
  showErrorMsg: boolean;
  role: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.isLoading = false;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.login = new Login();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.isLoading = true;
    this.submitted = true;
    this.login.dsUsername = this.loginForm.controls.username.value;
    this.login.password = this.loginForm.controls.password.value;
    console.log("username: " + this.login.dsUsername);
    // this.signIn();
    //  this.loginService.findLogin(this.login).subscribe(data => {
    //    //this.login.dsUsername = JSON.stringify(data);
    //    this.login = data;
    //    this.isSet = true;
    //    console.log("received "+ this.login.dsUsername);s
    //  })
    this.loginService.findLogin(this.login).subscribe(data => {
      //console.log(JSON.stringify(data));
      if (data !== null) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', data.dsUsername);
        if (data.role === 'lecturer') {
          this.router.navigate(["/admin"]);
        } else {
          this.router.navigate(["/student"]);
        }
      } else {
        this.showErrorMsg = true;
      }

    })
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  signIn(homePage: string): void {
    this.router.navigate(['/home']);
  }

}
