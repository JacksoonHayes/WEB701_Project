import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ValidateService, AuthService]
})
export class AppComponent implements OnInit {
  title = '-Grow&Give-';

  ngOnInit(): void {
    // // Clear localStorage on app start to log out any saved session
    // if (typeof window !== 'undefined' && window.localStorage) {
    //   localStorage.clear();
    // } 
  }
}
