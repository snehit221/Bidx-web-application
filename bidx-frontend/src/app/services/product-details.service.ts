import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment.stage';
import { WishlistResponse } from '../shared/models/response';
/* @author - snehitroda */

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private apiUrl = `${environment.apiUrl}/products`;

  //private apiUrlStubbed = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  getProduct(productId: string): Observable<any> {
    console.log("productId", productId)
    const url = `${this.apiUrl}/${productId}`;
    console.log("The prepared url is: ", url);
    return this.http.get<any>(url);
  }

  concludeBidding(productId: string): Observable<any> {
    const url = `${this.apiUrl}/concludeBidding/${productId}`;
    return this.http.post<any>(url, null);

  }

  getProductsBySearchFilters(searchFilters: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/search/products`;
    return this.http.post(url, searchFilters);
  }

  getProductInfo(productId: string) {
    return this.http.get(`product-info?pid=${productId}`);
  }

  getProductsByIds(productIds: string[]): Observable<WishlistResponse> {
    console.log("productIds", productIds)
    const url =`${environment.apiUrl}/api/v1/search/products-wish-list`
    const requestBody = JSON.stringify(productIds);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Set Content-Type to application/json
    });

    return this.http.post<WishlistResponse>(url, requestBody, { headers });
  }
}