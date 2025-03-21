import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  customerService = inject(CustomerService);
  categoryList: Category[] = [];
  router = inject(Router);
  authService = inject(AuthService);
  searchTerm!: string;

  ngOnInit() {
    // Load categories if the user is already logged in
    if (this.authService.isLoggedIn) {
      this.loadCategories();
    }

    // Subscribe to changes in the login state
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.loadCategories();
      } else {
        this.categoryList = []; // Clear categories if the user logs out
      }
    });
  }

  loadCategories() {
    this.customerService.getCategories().subscribe((result: any) => {
      this.categoryList = result;
    });
  }

  onSearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl('/products?search=' + e.target.value);
    }
  }

  searchCategory(id: string) {
    this.searchTerm = '';
    this.router.navigateByUrl('/products?categoryId=' + id!);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}