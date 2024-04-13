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
  selector: 'app-seller-order-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CategoryBarComponent, FooterComponent, HeaderBarComponent, HttpClientModule, MatSnackBarModule,
    RouterModule],
  templateUrl: './seller-order-details.component.html',
  styleUrl: './seller-order-details.component.css'
})
export class SellerOrderDetailsComponent {
  order: any;
  statusForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private fb: FormBuilder,
    private productDetailsService: ProductDetailsService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.statusForm = this.fb.group({
      orderStatus: ['', Validators.required],
      cancellationReason: [''],
      cancellationComment: ['']
    });

    this.onStatusChange();
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

  onStatusChange() {
    this.statusForm.get('orderStatus')?.valueChanges.subscribe(status => {
      if (status === 'CANCELED') {
        this.statusForm.get('cancellationReason')?.setValidators(Validators.required);
        this.statusForm.get('cancellationReason')?.updateValueAndValidity();
      } else {
        this.statusForm.get('cancellationReason')?.clearValidators();
        this.statusForm.get('cancellationReason')?.updateValueAndValidity();
      }
    });
  }
  
  submitStatusChange() {
    if (this.statusForm.valid) {
      const formData = {
        status: this.statusForm.value.orderStatus,
        cancellationReason: this.statusForm.value.orderStatus === 'CANCELED' ? this.statusForm.value.cancellationReason : null,
        cancellationComment: this.statusForm.value.orderStatus === 'CANCELED' ? this.statusForm.value.cancellationComment : null
      };
  
      this.orderService.updateOrderStatus(this.order.id, formData).subscribe({
        next: (response) => {
          this.order = { ...this.order, ...formData };
          this.snackBar.open('Order status updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/seller-orders']);
        },
        error: (error) => {
          this.snackBar.open('Error updating order status', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.statusForm.markAllAsTouched();
      this.snackBar.open('Form is not valid', 'Close', { duration: 3000 });
    }
  }
}
