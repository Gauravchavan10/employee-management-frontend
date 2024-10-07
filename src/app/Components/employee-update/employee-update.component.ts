import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service.service';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Model/Employee';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit{
  employee: Employee = {
    id: 0,
    userName: '',
    name: '',
    department: '',
    position: '',
    salary: 0,
    password: ''
  };
 loggedInUser: string | null = null; 
 constructor(
   private employeeService: EmployeeService,
   private authService: AuthService,
   private route: ActivatedRoute,
   private router: Router 
 ) {}

 ngOnInit(): void {
   this.loggedInUser = this.authService.getUsernameFromToken(); 
   const employeeId = this.route.snapshot.paramMap.get('id');
   if (employeeId) {
     this.loadEmployee(+employeeId);
   }
 }

 loadEmployee(id: number): void {
   this.employeeService.getEmployeeById(id).subscribe((data: Employee) => {
     this.employee = data;
   });
 }

 canEdit(): boolean {
  
   return this.employee.userName === this.loggedInUser;
 }

 updateEmployee(): void {
  
   if (this.canEdit()) {
     this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(() => {
       alert('Employee updated successfully.');
       this.router.navigate(['/employees']); 
     });
   } else {
     alert('You are not authorized to update this employee.');
   }
 }

}
