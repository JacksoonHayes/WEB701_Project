import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileDonorComponent } from '../profile-donor/profile-donor.component';
import { ProfileBeneficiaryComponent } from '../profile-beneficiary/profile-beneficiary.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfileDonorComponent, ProfileBeneficiaryComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  role: string = "";
  newPassword: string = "";
  isLoggedIn: boolean = false;
  orders: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit() {
    const profileObservable = this.authService.getProfile();
  
    if (profileObservable) {
        profileObservable.subscribe(
            (profile: any) => {
              this.user = profile.user;
              this.role = this.user.role;
            },
            (err) => {
                console.log(err);
                this.router.navigate(['/login']);
                return;
            }
        );
    } else {
        this.router.navigate(['/login']);
    }
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

  redeemToken() {
    // Method logic for redeeming tokens
  }

}
