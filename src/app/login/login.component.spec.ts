import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OverlayModule} from "@angular/cdk/overlay";
import {LoginService} from "./login.service";
import {of} from "rxjs";
import {Login} from "./login";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  const snackBarMock = jasmine.createSpyObj(['open']);
  snackBarMock.open

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        OverlayModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        {provide: MatSnackBar, useValue: snackBarMock},
      ],
    })
    .compileComponents();
    loginService = TestBed.get(LoginService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initial login form test', () => {
    const loginFormTestUsername: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[0];
    const loginFormTestPassword: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[1];
    const usernameTest = component.loginForm.get('username');
    const passwordTest = component.loginForm.get('password');
    expect(loginFormTestUsername.value).toEqual(usernameTest?.value);
    expect(loginFormTestPassword.value).toEqual(passwordTest?.value);
    expect('').toEqual(usernameTest?.value);
    expect('').toEqual(passwordTest?.value);
  });

  it('Form validators test', () => {
    const loginFormTestUsername: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[0];
    const loginFormTestPassword: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[1];
    const usernameTest = component.loginForm.get('username');
    const pwTest = component.loginForm.get('password');
    expect(loginFormTestUsername.value).toEqual(usernameTest?.value);
    expect(loginFormTestPassword.value).toEqual(pwTest?.value);
    expect(usernameTest?.errors).not.toBeNull();
    expect(pwTest?.errors).not.toBeNull();
    // @ts-ignore
    expect(usernameTest?.errors.required).toBeTruthy();
    // @ts-ignore
    expect(pwTest?.errors.required).toBeTruthy();
  });

  it('Login form dummy details should work', () => {
    const loginFormTestUsername: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[0];
    const loginFormTestPassword: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[1];
    loginFormTestUsername.value = 'abcd1234';
    loginFormTestPassword.value = 'admin';
    loginFormTestUsername.dispatchEvent(new Event('input'));
    loginFormTestPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const usernameTest = component.loginForm.get('username');
      const pwTest = component.loginForm.get('password');
      expect(loginFormTestUsername.value).toEqual(usernameTest?.value);
      expect(loginFormTestPassword.value).toEqual(pwTest?.value);
      expect(usernameTest?.errors).toBeNull();
      expect(pwTest?.errors).toBeNull();
    })
  });

  it('should not open snackbar', () => {
    component.onSubmit();
   expect(snackBarMock.open.calls.count()).toEqual(0);
  });

  it('should make findLogin() service call to backend', () => {
    const mockLogin = new Login();
    spyOn(loginService, 'findLogin').and.returnValue(of( mockLogin)).and.callThrough();
    loginService.findLogin(mockLogin);
    expect(loginService.findLogin).toHaveBeenCalled();
  });

});
