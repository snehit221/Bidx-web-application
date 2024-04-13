

import { Component, OnInit } from '@angular/core';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { CommonModule} from '@angular/common';
import { AuthService } from '../auth.service';
import { ProductDetailsService } from '../services/product-details.service';
import { RouterModule } from '@angular/router';
import {WishlistResponse } from '../shared/models/response';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [HeaderBarComponent,
    FooterComponent,
    CategoryBarComponent,
    CommonModule,
  RouterModule],
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css']
})

export class WishlistComponent implements OnInit {
  products: any[] = [];
  wishlistIds: string[] = []; 

  constructor(
    private productDetailsService: ProductDetailsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadWishlistProducts();
  }

  loadWishlistProducts(): void {
    this.authService.getUserId().subscribe({
      next: (userId) => {
        if (userId) {
          this.wishlistIds = this.getWishlistFromLocalStorage() || [];
          this.productDetailsService.getProductsByIds(this.wishlistIds).subscribe(
            (response: WishlistResponse) => {
              this.products = response.userWishList;
              console.log('Wishlist products:', this.products);
            },
            (error) => {
              console.error('Error fetching wishlist products:', error);
            }
          );
        } else {
          console.error('User ID is null or undefined');
        }
      },
      error: (error) => {
        console.error('Error getting user ID:', error);
      }
    });
  }

  getWishlistFromLocalStorage(): string[] | null {
    const wishlistJson = localStorage.getItem('wishlist');
    if (!wishlistJson) {
      return null;
    }
    return JSON.parse(wishlistJson);
  }
}