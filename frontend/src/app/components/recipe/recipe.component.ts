// recipe.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [ CommonModule, FormsModule, FooterComponent ],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  ingredients: string = '';
  recipe: string = '';
  displayedText: string = ''; // For typewriter effect
  typingSpeed: number = 15; // Speed in ms per character
  isTyping: boolean = false; // New flag to prevent multiple recipe generation requests
  loadingRequest: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService  
    ) {}

  ngOnInit() {
    // Check if the user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  generateRecipe() {
    if (this.isTyping) {
      alert('Please wait until the current recipe is fully displayed.');
      return;
    }

    this.loadingRequest = true; // Set loading to true when the request starts
    const ingredientList = this.ingredients.split(',').map(ing => ing.trim());

    this.http.post<{ recipe: string }>('http://localhost:3000/recipes', { ingredients: ingredientList }, {
        headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`
        })
    }).subscribe(
        (res) => {
            this.recipe = res.recipe;
            this.displayedText = ''; // Reset the displayed text
            this.isTyping = true; // Set to true when typing starts
            this.loadingRequest = false; // Set loading to false when the response is received
            this.typeOutRecipe(); // Start the typing effect
        },
        (error) => {
            console.error('Error generating recipe:', error);
            this.loadingRequest = false; // Ensure loading is reset on error
            alert('Failed to generate recipe.');
        }
    );
  }

  typeOutRecipe() {
    let index = 0;
    const typingInterval = setInterval(() => {
      // Append one character at a time to displayedText
      this.displayedText += this.recipe.charAt(index);
      index++;
      
      // Stop once the whole text is displayed
      if (index === this.recipe.length) {
        clearInterval(typingInterval);
        this.isTyping = false; // Set to false when typing ends
      }
    }, this.typingSpeed);
  }
}
