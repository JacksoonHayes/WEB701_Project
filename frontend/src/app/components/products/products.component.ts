import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: any[] = [];

    constructor(private productService: ProductService, private router: Router) {}

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (data) => this.products = data,
            (error) => console.error(error)
        );
    }

    // Navigate to the product details page
    viewProduct(productId: string): void {
        this.router.navigate(['/product', productId]);
    }
}
