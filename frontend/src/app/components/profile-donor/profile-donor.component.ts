import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { ProductService } from '../../services/donation.service';

@Component({
  selector: 'app-profile-donor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-donor.component.html',
  styleUrl: './profile-donor.component.css'
})
export class ProfileDonorComponent implements OnInit {
  listings: any[] = [];
  orders: any[] = [];
  newListing = { name: '', description: '', location: '', image: '', stock: 0 };
  editMode = false;
  editingId: string | null = null;
  showForm = false;

  description: string = '';
  loadingRequest: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private validateService: ValidateService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadDonorListings();
    this.loadOrders();
  }

  loadDonorListings() {
    this.productService.getDonorListings().subscribe(
      (data: any) => {
        this.listings = data;
      },
      (error) => {
        console.error("Error loading donor listings:", error);
      }
    );
  }

  generateDescription(): void {
    const briefDescription = this.newListing.description;
    if (!briefDescription) {
      alert('Please enter a brief description first.');
      return;
    }
    
    this.loadingRequest = true; // Show loading while request is processing

    this.http.post<{ description: string }>(
      'http://localhost:3000/description',
      { briefDescription },
      { headers: new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` }) }
    ).subscribe(
      (response) => {
        this.newListing.description = response.description;
        this.loadingRequest = false;
      },
      (error) => {
        console.error('Error generating description:', error);
        this.loadingRequest = false;
        alert('Failed to generate description.');
      }
    );
  }

  toggleForm() {
    this.showForm = !this.showForm; // Toggle visibility of the Add New Listing form
    if (this.showForm && this.editMode) {
      this.cancelEdit(); // Ensure edit mode is reset if toggling the add form
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addListing() {
    if (!this.validateService.validateListing(this.newListing)) {
      alert('Please fill out all required fields.');
      return;
    }
    this.http.post('http://localhost:3000/products/add', this.newListing, { headers: this.getAuthHeaders() }).subscribe(() => {
      this.loadDonorListings();
      this.resetForm();
    });
  }

  editListing(listing: any) {
    if (this.editingId === listing._id) {
      // If the listing is already being edited, close the form
      this.cancelEdit();
    } else {
      // Otherwise, open the form for the selected listing
      this.editMode = true;
      this.editingId = listing._id;
      this.newListing = { ...listing }; // Load selected listing into form
    }
  }

  // Update the listing in edit mode
  updateListing() {
    if (!this.validateService.validateListing(this.newListing)) {
      alert('Please fill out all required fields.');
      return;
    }
    this.http.put(`http://localhost:3000/products/update/${this.editingId}`, this.newListing, { headers: this.getAuthHeaders() }).subscribe(() => {
      this.loadDonorListings();
      this.cancelEdit(); // Exit edit mode after updating
    });
  }

  // Cancel editing
  cancelEdit() {
    this.editMode = false;
    this.editingId = null;
    this.newListing = { name: '', description: '', location: '', image: '', stock: 0 };
  }

  deleteListing(id: string) {
    const confirmation = confirm('Are you sure you want to delete this listing?');
    if (!confirmation) {
      return; // Exit if the user cancels
    }
    this.http.delete(`http://localhost:3000/products/delete/${id}`, { headers: this.getAuthHeaders() }).subscribe(() => {
      this.loadDonorListings();
    });
  }

  resetForm() {
    this.newListing = { name: '', description: '', location: '', image: '', stock: 0 };
    this.showForm = false;
  }

  loadOrders(): void {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
    this.http.get<any[]>('http://localhost:3000/orders/donor-orders', { headers }).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => console.error("Error loading orders:", error)
    );
  }

  approveOrder(orderId: string): void {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  
    this.http.put('http://localhost:3000/orders/update-status', { orderId, action: 'approve' }, { headers }).subscribe(
      () => alert('Order approved!'),
      (error) => console.error('Error approving order:', error)
    );
  }
  
  declineOrder(orderId: string): void {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  
    this.http.put('http://localhost:3000/orders/update-status', { orderId, action: 'decline' }, { headers }).subscribe(
      () => alert('Order declined and voucher refunded!'),
      (error) => console.error('Error declining order:', error)
    );
  }
}