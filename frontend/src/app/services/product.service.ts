import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/products'; // Matches the route in `app.js`

    constructor(private http: HttpClient) {}

    getProducts(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    getProductById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
}
