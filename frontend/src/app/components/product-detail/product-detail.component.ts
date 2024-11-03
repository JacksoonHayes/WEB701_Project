import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any; // Stores the product details
  quantity: number = 1; // Default quantity for purchase
  selectedOption: string = 'One-time Purchase'; // Default payment option
  weights: string[] = ['250g', '500g', '750g', '1kg', '5kg'];
  selectedWeight: string = '250g';
  weightPrices: { [key: string]: number } = {
    '250g': 3.99,
    '500g': 6.99,
    '750g': 9.99,
    '1kg': 12.99,
    '5kg': 35.99
};
displayedPrice: number = this.weightPrices['250g'];

  constructor(
      private route: ActivatedRoute,
      private productService: ProductService,
      private cartService: CartService
  ) {}

  ngOnInit(): void {
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
          this.getProductById(productId);
      }
  }

  // Fetch product data from the backend
  getProductById(id: string): void {
      this.productService.getProductById(id).subscribe(
          (data) => this.product = data,
          (error) => console.error(error)
      );
  }

  addToCart(): void {
    const item = {
      name: this.product.name,
      price: this.displayedPrice,
      quantity: this.quantity,
      weight: this.selectedWeight,
      purchaseOption: this.selectedOption
    };
    this.cartService.addToCart(item);
    console.log('Item added to cart:', item);
  }

  selectOption(option: string): void {
      this.selectedOption = option;
  }

  selectWeight(weight: string): void {
    this.selectedWeight = weight;
    this.displayedPrice = this.weightPrices[weight]; // Update the displayed price
  }
}
