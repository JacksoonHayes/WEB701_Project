import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalCostAmount: number = 0;

  constructor(
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  calculateTotalCostAmount(): void {
    this.totalCostAmount = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  placeOrder(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    const orderData = {
      items: this.cartItems,
      totalCostAmount: this.totalCostAmount
    };

    this.http.post('http://localhost:3000/orders', orderData, { headers }).subscribe(
      (response) => {
        console.log("Order successfully placed:", response);
        this.cartService.clearCart();
      },
      (error) => {
        console.error("Failed to place order:", error);
      }
    );
  }
}
