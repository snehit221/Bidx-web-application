/* Author: Ubaidullah */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment.stage';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  submitOrder(order: any): Observable<any> {
    return this.http.post(`${this.orderUrl}/create`, order);
  }

  getOrdersByUserId(userId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderUrl}/user/${userId}`);
  }

  getOrdersBySellerId(sellerId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderUrl}/seller/${sellerId}`);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.orderUrl}/${orderId}`);
  }

  cancelOrder(orderId: string, cancellationData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/orders/cancel/${orderId}`, cancellationData);
  }

  updateOrderStatus(orderId: string, updatedStatus: any): Observable<any> {
    return this.http.patch(`${this.orderUrl}/${orderId}`, updatedStatus);
  }
}
