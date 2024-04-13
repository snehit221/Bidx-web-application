/* Author: Ubaidullah */

import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { ProductDetailsService } from '../services/product-details.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CategoryBarComponent, FooterComponent, HeaderBarComponent, HttpClientModule, MatSnackBarModule,
    RouterModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  order: any;
  cancellationForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private fb: FormBuilder,
    private productDetailsService: ProductDetailsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.cancellationForm = this.fb.group({
      cancellationReason: ['', Validators.required],
      cancellationComment: ['']
    });
  }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe(order => {
        const [year, month, day, hour, minute, second] = order.orderDate;
        const date = new Date(year, month - 1, day, hour, minute, second);
        order.orderDate = date;
        this.productDetailsService.getProduct(order.productId).subscribe(product => {
          order.product = product;
        });
        this.order = order;
      });
    }
  }
  createImageUrl(imagesMap: Record<string, string>): string[] {
    // Extract URLs from the imagesMap and return as an array
    if (imagesMap)
      return Object.values(imagesMap);
    
    return []
  }
  
  submitCancellation() {
    if (this.cancellationForm.valid) {
      const cancellationData = {
        reason: this.cancellationForm.value.cancellationReason,
        comment: this.cancellationForm.value.cancellationComment
      };
  
      this.orderService.cancelOrder(this.order.id, cancellationData).subscribe({
        next: (response) => {
          this.snackBar.open('Order status updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          this.snackBar.open('Error updating order status', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.cancellationForm.markAllAsTouched();
      this.snackBar.open('Form is not valid', 'Close', { duration: 3000 });
    }
  }
}
