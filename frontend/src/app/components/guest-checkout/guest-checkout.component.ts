import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-guest-checkout',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './guest-checkout.component.html',
  styleUrls: ['./guest-checkout.component.css']
})
export class GuestCheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalCostAmount: number = 0;

  constructor(
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  calculateTotalAmount(): void {
    this.totalCostAmount = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  placeOrderAsGuest(): void {
    console.log("Order placed as guest:", this.cartItems);
    this.cartService.clearCart();
  }
}
