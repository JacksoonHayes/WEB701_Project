import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/donation.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

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
      private authService: AuthService,
      private http: HttpClient
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

    // product-detail.component.ts
  redeemVoucher(): void {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });

    this.http.post('http://localhost:3000/orders', { productId: this.product._id }, { headers }).subscribe(
      (response) => {
        alert('Voucher redeemed and order created!');
      },
      (error) => {
        console.error('Error redeeming voucher:', error);
        alert('Failed to redeem voucher.');
      }
    );
  }
}
