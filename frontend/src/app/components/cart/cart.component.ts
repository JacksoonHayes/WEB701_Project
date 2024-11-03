import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  proceedToCheckout(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/checkout']); // Adjust the route to your checkout page
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkoutAsGuest(): void {
    this.router.navigate(['/guest-checkout']); // Adjust the route as needed for guest checkout
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
