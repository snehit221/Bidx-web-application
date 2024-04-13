import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductDetailsService } from '../services/product-details.service';
import { Product } from '../shared/models/Product';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../auth.service';

/* @author - snehitroda */

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HeaderBarComponent,
    CategoryBarComponent,
    FooterComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId!: string;
  product!: Product;
  imageUrls!: string[];
  searchTerm: string = ''; 
  isSeller: boolean = true;
  isInWishlist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productDetailsService: ProductDetailsService,
    private authService: AuthService
  ) {}

  productInfo: any;
  selectedImage: string | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchTerm'] || '';
      this.productId = params['id'];
    });

    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this.checkWishlistStatus();
        this.isSeller = this.authService.isSeller();
        this.productDetailsService.getProduct(this.productId).subscribe({
          next: (productInfo) => {
            this.productInfo = productInfo;
            console.log('productInfo: ', productInfo);
            this.createImagesUrl(productInfo.images);
          },
          error: (error) => {
            console.error('Error fetching user detail:', error);
          },
        });
      }
    });
  }

  checkWishlistStatus(): void {
    let wishlist: string[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.isInWishlist = wishlist.includes(this.productId);
  }

  toggleWishlist(productId: string): void {
    let wishlist: string[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!this.isInWishlist) {
      wishlist.push(productId);
    } else {
      wishlist = wishlist.filter(id => id !== productId);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    this.isInWishlist = !this.isInWishlist;
  }

  createImagesUrl(images: any) {
    const imageUrls: string[] = Object.values(images);
    this.imageUrls = imageUrls;
  }

  createImageUrl(imagesMap: Record<string, string> | undefined): string[] {
    if (!imagesMap) return [];
    return Object.values(imagesMap);
  }

  selectImage(index: number): void {
    console.log('calling select image... ind: ', index);
    // Set the selectedImage to the corresponding image URL based on the index
    this.selectedImage = this.imageUrls[index];
  }

  backToResults(): void {
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchTerm },
    });
  }

  placeBid(product: Product): void {
    this.router.navigate([`/manual-bidding/${product.id}`]);
  }


  addToWishlist(productId: string): void {
    let wishlist: string[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      console.log('Product added to wishlist:', productId);
    } else {
      console.log('Product already in wishlist');
    }
  }
}
