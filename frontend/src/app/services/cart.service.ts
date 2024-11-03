import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    // Load cart from local storage if it exists
    if (typeof window !== 'undefined' && window.localStorage) {
      this.loadCart();
    }
  }

  // Load cart from local storage
  private loadCart(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
    }
  }

  // Add an item to the cart
  addToCart(item: any): void {
    this.cartItems.push(item);
    this.updateLocalStorage();
  }

  // Retrieve cart items
  getCartItems(): any[] {
    return this.cartItems;
  }

  // Update local storage when cart changes
  private updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Clear cart (e.g., after checkout)
  clearCart(): void {
    this.cartItems = [];
    this.updateLocalStorage();
  }
}
