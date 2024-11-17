import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RecipeComponent } from './components/recipe/recipe.component';

// Route Configuration
export const routes: Routes = [
    { path: '', component: HomeComponent }, // Default Route
    { path: 'register', component: RegisterComponent }, // register route
    { path: 'login', component: LoginComponent }, // login route
    { path: 'profile', component: ProfileComponent }, // profile route
    { path: 'products', component: ProductsComponent }, // products route
    { path: 'contact', component: ContactComponent }, // contact route
    { path: 'product/:id', component: ProductDetailComponent }, // product detail route
    { path: 'recipe', component: RecipeComponent } // recipe route
];
