import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Model/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployee: Employee | null = null; 
  searchId: number | null = null; 
  loggedInUser: string | null = null; 

  constructor(private employeeService: EmployeeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getUsernameFromToken(); 
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  searchEmployee(): void {
    if (this.searchId !== null) {
      this.employeeService.getEmployeeById(this.searchId).subscribe(
        employee => {
          this.filteredEmployee = employee;
        },
        error => {
          this.filteredEmployee = null;
          alert('Employee not found');
        }
      );
    }
  }

  canEdit(employee: Employee): boolean {
    return employee.userName === this.loggedInUser; 
  }

  canDelete(employee: Employee): boolean {
    return employee.userName === this.loggedInUser; 
  }
}
