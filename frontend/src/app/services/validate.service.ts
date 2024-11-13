import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: any) {
    if (!user.name || !user.email || !user.password) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validateListing(listing: any): boolean {
    const { name, description, location, stock } = listing;
    return !!(name && description && location && stock !== null && stock !== undefined);
  }
}
