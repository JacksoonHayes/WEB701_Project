import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/products'; // Matches the route in `app.js`

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getDonations(): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(`${this.apiUrl}?type=donation`, { headers });
    }
    
    getDonationById(id: string): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
    }
}
