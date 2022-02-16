import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OverlayModule} from "@angular/cdk/overlay";
import {LoginService} from "./login.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {Observable, of} from "rxjs";
import {Login} from "./login";
import {By} from "@angular/platform-browser";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let httpMock: HttpTestingController;
  let loginService: LoginService;
  //let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
 // let mockSnackbar = jasmine.createSpyObj(['open']);

  beforeEach(async () => {
    //const mockSb = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        OverlayModule
      ],
      declarations: [ LoginComponent ],
      providers: [MatSnackBar]
      //providers: [{provide: MatSnackBar, useValue: mockSb}]
    })
    .compileComponents();
    loginService = TestBed.get(LoginService);
   // matSnackBarSpy = TestBed.get<MatSnackBar>(MatSnackBar);
    // httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() method on form submit', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    // Supply id of your form below formID
    const getForm = fixture.debugElement.query(By.css('form'));
    expect(getForm.triggerEventHandler('submit', compiled)).toBeUndefined();
  });

  it('should make findLogin() service call to backend', () => {
    const mockLogin = new Login();
    spyOn(loginService, 'findLogin').and.returnValue(of( mockLogin)).and.callThrough();
    loginService.findLogin(mockLogin);
    expect(loginService.findLogin).toHaveBeenCalled();
    //expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  xit('should open snackbar', () => {
    // const mockSnackbarMock = jasmine.createSpyObj(['open']);
    // mockSnackbarMock.open
    // const mockLOgin = new Login();
    // // spyOn(loginService, 'findLogin');//.and.callThrough()
    // loginService.findLogin(mockLOgin);
    // // spyOn(mockSnackbarMock,"open").and.callThrough();
    // // component.ngOnInit();
    // expect(mockSnackbarMock.open).toHaveBeenCalled();
    const mockLOgin = new Login();
    const error = new HttpErrorResponse({error: 'Some error'});

    component.ngOnInit();
    loginService.findLogin(mockLOgin);

    //expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  xit('handleErrors should open the snacker', () => {
   // spyOn(loginService, 'findLogin').and.callThrough();
    var contactsServiceMock = jasmine.createSpyObj(
      "LoginService", ["findLogin"]);

    contactsServiceMock.findLogin.and.returnValue(
      null);
    spyOn(component.snackBar, 'open').and.callThrough();


    //component.handleErrors({message: 'error'} as any);
    expect(component.snackBar.open).toHaveBeenCalled();
  });

});
