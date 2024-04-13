// import { Injectable} from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class ProductDetailsService {

//   private apiUrl = 'http://localhost:8080/api/v1/search/products';

//   //private defaultProducts: Product[];
  
//   constructor(private http: HttpClient) { }

//   // constructor based dependency injection - which loads the default products by
//   // specifically injecting an instance of DefaultProducts to handle default product data.
//   // constructor(defaultProductsProvider: DefaultProducts) {
//   //   this.defaultProducts = defaultProductsProvider.loadDefaultSearchProducts();
//   // }

//   // getAllProductsBySearchTerm(searchTerm: string): Product[] {
//   //   // TODO update my ts function to call the search API
//   //   return this.defaultProducts.filter(product =>
//   //     product.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   //   );
//   // }


//   getProductsBySearchFilters(searchFilters: any): Observable<any> {
//     return this.http.post(this.apiUrl, searchFilters);
//   }

//   getProductInfo(productId: string) {
//     // Make API call with productId as parameter
//     return this.http.get(`product-info?pid=${productId}`);
//   }
//   /* this method returns the list of all searchable products with some
//    default properties set */
//   //  getAllProductDetails(): Product[] {
//   //   return this.defaultProducts;
//   // }
// }
