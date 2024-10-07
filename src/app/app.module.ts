import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.service'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './Components/employee-detail/employee-detail.component';
import { EmployeeAddComponent } from './Components/employee-add/employee-add.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Components/header/header.component';
import { EmployeeDeleteComponent } from './Components/employee-delete/employee-delete.component';
import { EmployeeUpdateComponent } from './Components/employee-update/employee-update.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth-service.service';
import { FooterComponent } from './Components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeAddComponent,
    HomeComponent,
    HeaderComponent,
    EmployeeDeleteComponent,
    EmployeeUpdateComponent,
    LogoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'), 
        allowedDomains: ['localhost:44317'], 
        disallowedRoutes: ['http://localhost:44317/api/Employees/login'], 
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    JwtHelperService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
