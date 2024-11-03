import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  newPassword: string = "";
  isLoggedIn: boolean = false;
  orders: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}
  
  ngOnInit() {
    const profileObservable = this.authService.getProfile();
  
    if (profileObservable) {
      profileObservable.subscribe(
        (profile: any) => {
          this.user = profile.user;
          this.getUserOrders();
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
    // Check if the user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  
  updateDetails() {
    if (this.newPassword) {
      this.authService.updatePassword(this.newPassword).subscribe(
        (res: any) => {
          console.log(res.message);
          // Optionally display a success message to the user
          alert('Password updated successfully!');
        },
        (err) => {
          console.error('Error updating password:', err);
          // Optionally display an error message to the user
          alert('Failed to update password.');
        }
      );
    } else {
      alert('Please enter a new password.');
    }
  }

  getUserOrders(): void {
    const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    
    this.http.get<any[]>('http://localhost:3000/orders', { headers }).subscribe(
      (orders) => (this.orders = orders),
      (err) => console.error('Failed to retrieve orders:', err)
    );
    console.log(this.orders);
  }

}
