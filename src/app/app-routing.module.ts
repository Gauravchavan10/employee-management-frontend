import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './Components/employee-add/employee-add.component';
import { EmployeeDetailComponent } from './Components/employee-detail/employee-detail.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './Components/home/home.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { EmployeeUpdateComponent } from './Components/employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './Components/employee-delete/employee-delete.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/add', component: EmployeeAddComponent },
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [authGuard] },
  { path: 'employees/update/:id', component: EmployeeUpdateComponent, canActivate: [authGuard] },
  { path: 'employees/delete/:id', component: EmployeeDeleteComponent, canActivate: [authGuard] },
 
 
  { path: '', redirectTo: '/login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
