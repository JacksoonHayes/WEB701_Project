import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/donation.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private productService: ProductService,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
        return;
      }
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
          this.getProductById(productId);
      }
  }

  // Fetch product data from the backend
  getProductById(id: string): void {
      this.productService.getDonationById(id).subscribe(
          (data) => this.product = data,
          (error) => console.error(error)
      );
  }

  redeemVoucher(): void {
    alert('Voucher redeemed!');
  }
}
