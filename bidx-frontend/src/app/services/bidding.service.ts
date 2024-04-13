// Shahroz Ahmad

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment.stage';

@Injectable({
  providedIn: 'root',
})
export class BiddingService {
  private bidAPIUrl = `${environment.apiUrl}/bids`;

  constructor(private http: HttpClient) {}

  createBid(bid: any): Observable<any> {
    return this.http.post(`${this.bidAPIUrl}/create`, bid);
  }

  getBidsByProductId(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.bidAPIUrl}/product/${productId}`);
  }

  declareBidWinner(productId: string): Observable<any[]> {
    return this.http.post<any[]>(
      `${this.bidAPIUrl}/declareWinner/${productId}`,
      null
    );
  }

  getBidStatus(productId: string, userId: string | null): Observable<any> {
    return this.http.get<any[]>(
      `${this.bidAPIUrl}/status/${productId}/${userId}`
    );
  }
}
