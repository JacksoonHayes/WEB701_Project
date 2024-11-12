import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule, FooterComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'donor';

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    // Validate the form data
    if (!this.validateService.validateRegister(user)) {
      alert('Please fill in all fields correctly.');
    } else if (!this.validateService.validateEmail(user.email)) {
      alert('Please enter a valid email address.');
    }

    // Register the user
    this.authService.registerUser(user).subscribe(
      (res: any) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      (err: any) => {
        if (err.status === 400 && err.error.msg === 'Email is already registered') {
          alert('This email is already registered. Please use another one.');
        } else {
          alert('Registration failed. Please try again.');
        }
      }
    );
  }
}
