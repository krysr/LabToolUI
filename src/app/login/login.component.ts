import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { Login } from './login'
import {LoginService} from "./login.service";
// import {AppService} from "../app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public redirectUrl: string;
  loginUsername: string;
  loginPassword: string;
  fieldTextType: boolean;
  // login: Login;
   login: Login;
  title = 'Demo';
  greeting = {};
 // greeting = {'id': 'XXX', 'content': 'Hello World'};
 // constructor(private http: HttpClient) {
    //http.get('api/hello').subscribe(data => this.greeting = data);
  //}
  allowAccess : boolean;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  isSet = false;
  returnUrl: string;
  // formBuilder: FormBuilder;

  constructor(
    private formBuilder: FormBuilder,
    //private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    // private app: AppService


    //private authenticationService: AuthenticationService,
    //private alertService: AlertService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.login = new Login();

    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() : void {
    this.submitted = true;
    this.login.dsUsername = this.loginForm.controls.username.value;
    this.login.password = this.loginForm.controls.password.value;
    console.log("username: " + this.login.dsUsername);
   // this.signIn();
   //  this.loginService.findLogin(this.login).subscribe(data => {
   //    //this.login.dsUsername = JSON.stringify(data);
   //    this.login = data;
   //    this.isSet = true;
   //    console.log("received "+ this.login.dsUsername);
   //  })
    this.loginService.findLogin(this.login).subscribe(data => {
      //this.login.dsUsername = JSON.stringify(data);
      this.allowAccess = data;
      //this.login= data;
      this.isSet = true;
      this.redirectUrl = "/home"

      if(this.allowAccess) {
        console.log("WELCOME!!!");
       // this.router.navigate([this.redirectUrl]);
      }
      console.log("received "+ this.login.dsUsername);
    })
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  signIn(homePage: string) {
    this.router.navigateByUrl('/home');
  }
}
