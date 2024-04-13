// @author - KaushikChanabhaiDhola

import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment.stage';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
    private apiUrl = `${environment.apiUrl}/products/getProducts`;

    constructor(private http: HttpClient) {}

    getProductsForCurrentUser(userId: number): Observable<any[]> {
        const url = `${this.apiUrl}/${userId}`;
        return this.http.get<any[]>(url);
    }

    
}