import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/donation.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, FooterComponent],
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    donationListings: any[] = [];

    constructor(
        private productService: ProductService,
        private authService: AuthService,
        private router: Router
        ) {}

    ngOnInit(): void {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }

        this.productService.getDonations().subscribe(
            (data) => this.donationListings = data,
            (error) => console.error(error)
        );
    }

    viewListing(listingId: string): void {
        this.router.navigate(['/product', listingId]);
    }
}
