// recipe.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  ingredients: string = '';
  recipe: string = '';
  displayedText: string = ''; // For typewriter effect
  typingSpeed: number = 15; // Speed in ms per character

  constructor(private http: HttpClient, private router: Router) {}

  generateRecipe() {
    const ingredientList = this.ingredients.split(',').map(ing => ing.trim());

    this.http.post<{ recipe: string }>('http://localhost:3000/recipes', { ingredients: ingredientList }, {
        headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`
        })
    }).subscribe(
        (res) => {
            this.recipe = res.recipe;
            this.displayedText = ''; // Reset the displayed text
            this.typeOutRecipe(); // Start the typing effect
        },
        (error) => {
            console.error('Error generating recipe:', error);
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
      }
    }, this.typingSpeed);
  }
}
