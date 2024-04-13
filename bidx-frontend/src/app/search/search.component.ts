import { Component, Input, OnInit } from '@angular/core';
import { ProductDetailsService } from '../services/product-details.service';
import { CommonModule } from '@angular/common'; // used for using *ngFor in html
import { Product } from '../shared/models/Product';
import { ActivatedRoute } from '@angular/router';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { SearchService } from '../core/search.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

/* @author - snehitroda */

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    HeaderBarComponent,
    CategoryBarComponent,
    FooterComponent,
    SearchFilterComponent,
  ],
})
export class SearchComponent implements OnInit {
  @Input() searchTerm: string = '';

  products: Product[] = [];
  //originalProducts: Product[] = [];

  isSeller: boolean = true;

  searchFilters: any = {
    productName: '',
    page: 0,
    sizePerPage: 6,
  };

  constructor(
    private router: Router,
    private productService: ProductDetailsService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to changes in the search term
    this.searchService.searchTerm$.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      console.log('calling update products from changes in search term');
      this.updateProducts();
    });

    // Fetch initial products based on the search term from the URL
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['query'] || '';
      console.log('calling update products URL');
      this.updateProducts();
    });

    this.isSeller = this.authService.isSeller();
  }

  updateProducts(): void {
    if (this.searchTerm) {
      this.searchFilters.productName = this.searchTerm; // Assigning the searchTerm to productName
      console.log('API Request:', this.searchFilters); // Log the API request

      this.productService
        .getProductsBySearchFilters(this.searchFilters)
        .subscribe((response: any) => {
          // Extract products from the response
          const products: Product[] = response.products.content;

          // Assign products to your component's property
          this.products = products;
          //this.originalProducts = products;

          // Log the API response
          console.log('API Response:', products);
        });
    }
  }

  // Method to move to the previous page
  previousPage(): void {
    if (this.searchFilters.page > 0) {
      this.searchFilters.page--;
      this.updateProducts();
    }
  }

  // Method to move to the next page
  nextPage(): void {
    this.searchFilters.page++;
    this.updateProducts();
  }

  clearAllFilters() {
    // Reset filters and show all products
    console.log('inside clear all filters...');
    this.searchFilters.isSortBy = false;
    this.searchFilters.isFilterBy = false;
    this.updateProducts();
    // this.products = [...this.originalProducts];
  }

  createImageUrl(imagesMap: Record<string, string>): string[] {
    // Extract URLs from the imagesMap and return as an array
    return Object.values(imagesMap);
  }

  // handles scenarios when no matching product is found
  isNoValidProductFound(): Boolean {
    return this.products.length == 0;
  }

  placeBid(product: Product): void {
    this.router.navigate([`/manual-bidding/${product.id}`]);
  }

  onProductNameClick(productId: string): void {
    console.log('Product ID:', productId);
    this.productService.getProductInfo(productId).subscribe((response) => {
      console.log('API Response:', response);
      // Handle response as needed
    });
  }

  applySearchQFilters(filter: { key: string; value: string }) {
    console.log(
      'Inside applySQFilter: key ' + filter.key + ' val : ' + filter.value
    );
    // Logic to update search results based on the selected filter
    // Filter products based on the selected key-value pair
    if (filter.key === 'price') {
      this.searchFilters.isSortBy = true;
      this.searchFilters.sortField = 'initialBid';
      if (filter.value === 'DESC') {
        console.log('applying DESC sort...');
        this.searchFilters.sortDirection = 'DESC';
      } else if (filter.value === 'ASC') {
        console.log('applying ASC sort...');
        this.searchFilters.sortDirection = 'ASC';
      } else {
        console.log('unknown sortBy request...');
      }
      // calling the updatProducts
      this.updateProducts();
    }

    if (filter.key === 'category' || filter.key === 'condition') {
      this.searchFilters.isFilterBy = true;
      this.searchFilters.filterBy = {};
      this.searchFilters.filterBy[filter.key] = filter.value;

      console.log('calling with updated searchFilters: ', this.searchFilters);
      this.updateProducts();
    }
  }

  navigateToProductDetails(productId: string): void {
    console.log('going to pd...');
    this.router.navigate(['/product-detail', productId], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }
}
