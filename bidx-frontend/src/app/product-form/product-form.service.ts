// @author - KaushikChanabhaiDhola
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment.stage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private baseUrl = `${environment.apiUrl}/products/create`;

    constructor(private http: HttpClient) { }

    addProductWithImages(userId: number, productData: any, images: File[]): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('userId', userId.toString());
        formData.append('name', productData.productName);
        formData.append('description', productData.productDesc);
        formData.append('initialBid', productData.bid.toString());
        formData.append('category', productData.category);
        formData.append('city', productData.city);
        formData.append('province', productData.province);
        formData.append('auctionDeadline', productData.auctionDeadline);
        formData.append('itemValue', productData.itemValue);
        for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
        }

        return this.http.post(`${this.baseUrl}`, formData);
    }
}
