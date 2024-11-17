import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient) { }

  // Observable to check if user is logged in
  getIsLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  // Get token from localStorage
  getToken(): string | null {
    let token: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) { // Check if localStorage is available
      token = localStorage.getItem('token'); // Get token and parse it to a string
      return token;
    } else {
      return null;
    }
  }

  // Register user and return response
  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers }) // Post request to register user
      .pipe(map((res: any) => res));
  }

  // Authenticate user and return response 
  authenticateUser(user: any) {
    let headers = new HttpHeaders(); // Set headers
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers }) // Post request to authenticate/login user
      .pipe(map((res: any) => res));
  }

  // Store user data in localStorage
  storeUserData(token: any, user: any) {
    localStorage.setItem('token', token); // Set token in localStorage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in localStorage
    this.authToken = token;
    this.user = user;
    this.isLoggedInSubject.next(true);
  }

  // Get user profile
  getProfile() {
    let token: string | null = null;
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) { 
      token = localStorage.getItem('token'); 
    } 
    // If there's a token, proceed with the profile request
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set headers
      return this.http.get('http://localhost:3000/users/profile', { headers }) // Get request to get user profile
        .pipe(map((res: any) => res));
    } else {
      return null; 
    }
  }

  // Update user profile
  updatePassword(newPassword: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put('http://localhost:3000/users/update', { newPassword }, { headers }) // Put request to update user profile
      .pipe(map((res: any) => res));
  }
  
  // Check if user is logged in
  isLoggedIn() {
    let token: string | null = null;
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token'); // Get token and parse it to a string
    }
    return token !== null;
  }

  // Log user out
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear(); // Clear localStorage
    this.isLoggedInSubject.next(false);
  }
}
