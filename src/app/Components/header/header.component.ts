import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; 
  userName: string = ''; 
  employeeId: number | null = null; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token'); 
    this.isLoggedIn = !!token; 
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem('userName') || 'User'; 
      this.employeeId = parseInt(localStorage.getItem('employeeId') || '0', 10); 
      console.log('userName:', this.userName); 
        console.log('employeeId:', this.employeeId); 
    }
  }

  logout() {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userName'); 
    this.isLoggedIn = false; 
    this.router.navigate(['/login']); 
  }
 
}
