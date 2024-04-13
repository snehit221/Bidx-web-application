/* Author: Ubaidullah */

import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductDetailsService } from '../services/product-details.service';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, CategoryBarComponent, FooterComponent, HeaderBarComponent, HttpClientModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  orders: any[] = [];
  userId: string | null = null;

  constructor(private orderService: OrderService, private productDetailsService: ProductDetailsService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(uid => {
      this.userId = uid;
      this.orderService.getOrdersByUserId(this.userId).subscribe(data => {
        this.orders = data;
        this.orders.forEach(order => {
          this.productDetailsService.getProduct(order.productId).subscribe(product => {
            order.productName = product.name;
          });
        });
      });
    });
  }

  viewOrder(orderId: string) {
    this.router.navigate(['/order-details', orderId]);
  }
}
