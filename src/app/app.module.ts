import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LabComponent } from './lab/lab.component';
import { MatTableModule } from "@angular/material/table";
import { MatSidenavModule } from "@angular/material/sidenav";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GradeComponent } from './grade/grade.component';
import { MDBBootstrapModule, ModalModule } from "angular-bootstrap-md";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { UploadStudentComponent } from './upload-student/upload-student.component';
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { StatisticComponent } from './statistic/statistic.component';
import { MatTabsModule } from "@angular/material/tabs";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSortModule } from "@angular/material/sort";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBar} from "@angular/material/snack-bar";
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'lab', component: LabComponent },
  { path: 'grade', component: GradeComponent },
  { path: 'upload', component: UploadStudentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LabComponent,
    GradeComponent,
    UploadStudentComponent,
    StatisticComponent
  ],
  entryComponents: [
    GradeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes),
    MatTableModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatTabsModule,
    NgxMaterialTimepickerModule,
    MatExpansionModule,
    MatSortModule,
    MatCardModule,
    ModalModule,
    MatMenuModule,
    ChartsModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {
}
