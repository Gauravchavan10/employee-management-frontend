import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service.service';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Model/Employee';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employee: Employee | null = null;
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

  canDelete(): boolean {
    return this.employee?.userName === this.loggedInUser;
  }

  deleteEmployee(): void {
    if (this.canDelete()) {
      this.employeeService.deleteEmployee(this.employee!.id).subscribe(() => {
        alert('Employee deleted successfully.');
        this.router.navigate(['/employees']);
      });
    } else {
      alert('You are not authorized to delete this employee.');
    }
  }
}
