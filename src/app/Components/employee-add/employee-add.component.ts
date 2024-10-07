import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Model/Employee';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employeeForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      userName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      salary: [0, [Validators.required, Validators.min(0)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      this.employeeService.addEmployee(newEmployee).subscribe(
        response => {
          this.successMessage = 'Employee added successfully!';
          this.employeeForm.reset(); 
        },
        error => {
          this.errorMessage = 'Failed to add employee. Please try again.';
        }
      );
    }
  }
}
