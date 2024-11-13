import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-profile-donor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-donor.component.html',
  styleUrl: './profile-donor.component.css'
})
export class ProfileDonorComponent implements OnInit {
  listings: any[] = [];
  newListing = { name: '', description: '', location: '', image: '', stock: 0 };
  editMode = false;
  editingId: string | null = null;
  showForm = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.loadListings();
  }

  toggleForm() {
    // Toggle the form display and reset edit mode if hiding the form
    if (this.showForm && this.editMode) {
      this.resetForm();
    } else {
      this.showForm = !this.showForm;
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  loadListings() {
    this.http.get('http://localhost:3000/products', { headers: this.getAuthHeaders() }).subscribe((data: any) => {
      this.listings = data;
    });
  }

  addListing() {
    if (!this.validateService.validateListing(this.newListing)) {
      alert('Please fill out all required fields.');
      return;
    }
    this.http.post('http://localhost:3000/products/add', this.newListing, { headers: this.getAuthHeaders() }).subscribe(() => {
      this.loadListings();
      this.resetForm();
    });
  }

  editListing(listing: any) {
    this.editMode = true;
    this.editingId = listing._id;
    this.newListing = { ...listing };
  }

  updateListing() {
    if (!this.validateService.validateListing(this.newListing)) {
      alert('Please fill out all required fields.');
      return;
    }
    this.http.put(`http://localhost:3000/products/update/${this.editingId}`, this.newListing, { headers: this.getAuthHeaders() }).subscribe(() => {
      this.loadListings();
      this.resetForm();
    });
  }

  deleteListing(id: string) {
    const confirmation = confirm('Are you sure you want to delete this listing?');
    if (!confirmation) {
      return; // Exit if the user cancels
    }
    this.http.delete(`http://localhost:3000/products/delete/${id}`, { headers: this.getAuthHeaders() }).subscribe(() => {
      this.loadListings();
    });
  }

  resetForm() {
    this.newListing = { name: '', description: '', location: '', image: '', stock: 0 };
    this.editMode = false;
    this.editingId = null;
  }
}