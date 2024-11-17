import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  // Validate user registration form
  validateRegister(user: any) {
    if (!user.name || !user.email || !user.password) {
      return false;
    } else {
      return true;
    }
  }

  // Validate email format
  validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Validate product listing form
  validateListing(listing: any): boolean {
    const { name, description, location, stock } = listing;
    return !!(name && description && location && stock !== null && stock !== undefined);
  }
}
