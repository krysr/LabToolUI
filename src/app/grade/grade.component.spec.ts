import { ComponentFixture, TestBed } from '@angular/core/testing';

import {GradeComponent} from './grade.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {of} from "rxjs";
import {Demo, Lab, Person} from "../lab/lab";
import {InjectionToken} from "@angular/core";
import {Login} from "../login/login";

describe('GradeComponent', () => {
  let component: GradeComponent;
  let fixture: ComponentFixture<GradeComponent>;
  const mockDemo = new Demo();
  mockDemo.demo = 'test';
  mockDemo.demoId = 1;
  mockDemo.lab = new Lab();
  mockDemo.person.firstName = 'mockName';
  mockDemo.person.lastName = 'mockLName';

  //mockDemo.demo = {demoId: 1, demo: 'test', position: 1, lab: {}, person: {}, seat: 32 };


  //let dialogSpy: jasmine.Spy;
  //let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  //dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MatDialogModule],
      declarations: [ GradeComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
       // { provide: DEMO, useValue: 'demo'}
        // provide: MatDialog, useClass: MatDialogStub }
      ],
    })
    .compileComponents();
   // component = TestBed.get(GradeComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeComponent);
    component = fixture.componentInstance;
    component.data = { demo: mockDemo};
    fixture.detectChanges();
    //dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    component.ngOnInit();


  });

  fit('should create', () => {
    let gridService = fixture.debugElement.injector.get(mockDemo);
    expect(component).toBeTruthy();
  });

  xit('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  xit('open modal ', () => {
    //component.open(GradeComponent, '300px');
  //  expect(dialogSpy).toHaveBeenCalled();

    // You can also do things with this like:
    //expect(dialogSpy).toHaveBeenCalledWith(GradeComponent, { maxWidth: '100vw' });

    // and ...
    //expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });
});
