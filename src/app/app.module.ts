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
import { HomeComponent } from './home/home.component';
import { LabComponent } from './lab/lab.component';
import { DemonstratorComponent } from './demonstrator/demonstrator.component';
import {MatTableModule} from "@angular/material/table";



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
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  // { path: 'main', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'student', component: StudentComponent },
  { path: 'demonstrator', component: DemonstratorComponent }
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
    DemonstratorComponent
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
        MatTableModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
