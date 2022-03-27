import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInterfaceComponent } from './admin-interface.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatMenuModule} from "@angular/material/menu";

/*** Some of these tests have been written using Sai Kumar Korthivada's article. Source: https://medium.com/javascript-frameworks/unit-testing-using-reactive-forms-in-angular-66b9fc4ee429       ***/

describe('UploadStudentComponent', () => {
  let component: AdminInterfaceComponent;
  let fixture: ComponentFixture<AdminInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        OverlayModule,
        MatMenuModule
      ],
      declarations: [ AdminInterfaceComponent ],
      providers: [MatSnackBar]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Initial lab form test', () => {
    const labClassElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#labForm').querySelectorAll('input')[0];
    const labRoomElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#labForm').querySelectorAll('input')[3];
    const classTEST = component.labForm.get('className');
    const RoomTEST = component.labForm.get('room');
    expect(labClassElement.value).toEqual(classTEST?.value);
    expect(labRoomElement.value).toEqual(RoomTEST?.value);
    expect('').toEqual(classTEST?.value);
    expect('').toEqual(RoomTEST?.value);
  });

  it('Form validators test', () => {
    const labClassElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#labForm').querySelectorAll('input')[0];
    const labclassIdlement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#labForm').querySelectorAll('input')[1];
    const classTEST = component.labForm.get('className');
    const idTEST = component.labForm.get('classId');
    expect(labClassElement.value).toEqual(classTEST?.value);
    expect(labclassIdlement.value).toEqual(idTEST?.value);
    expect(classTEST?.errors).not.toBeNull();
    expect(idTEST?.errors).not.toBeNull();
    // @ts-ignore
    expect(classTEST?.errors.required).toBeTruthy();
    // @ts-ignore
     expect(idTEST?.errors.required).toBeTruthy();
  });
});
