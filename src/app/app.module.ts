import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {StudentComponent} from './student/student.component'
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
// import {AppRoutingModule} from "./app-routing.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HomeComponent} from './home/home.component';
import {LabComponent} from './lab/lab.component';
import {DemonstratorComponent} from './demonstrator/demonstrator.component';
import {MatTableModule} from "@angular/material/table";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GradeComponent} from './grade/grade.component';
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {UploadStudentComponent} from './upload-student/upload-student.component';
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {StatisticComponent} from './statistic/statistic.component';
import {MatTabsModule} from "@angular/material/tabs";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSortModule} from "@angular/material/sort";


// @Injectable()
// export class XhrInterceptor implements HttpInterceptor {
//
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const xhr = req.clone({
//       headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
//     });
//     return next.handle(xhr);
//   }
// }

const routes: Routes = [
  // { path: 'users', component: UserListComponent },
  // { path: 'adduser', component: UserFormComponent }
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  // { path: 'main', component: AppComponent },
  {path: 'home', component: HomeComponent},
  {path: 'student', component: StudentComponent},
  {path: 'admin', component: DemonstratorComponent},
  {path: 'grade', component: GradeComponent},
  {path: 'upload', component: UploadStudentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    StudentComponent,
    UsersComponent,
    LoginComponent,
    HomeComponent,
    StudentComponent,
    LabComponent,
    DemonstratorComponent,
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
    // AppRoutingModule,
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
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
