import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
// import { UserListComponent } from './user-list/user-list.component';
// import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  // { path: 'users', component: UserListComponent },
  // { path: 'adduser', component: UserFormComponent }
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
