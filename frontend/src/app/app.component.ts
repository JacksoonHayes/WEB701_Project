import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ValidateService, AuthService]
})
export class AppComponent {
  title = '-Grow&Give-';
}
