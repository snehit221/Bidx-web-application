/* Author: Ubaidullah */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { ProductDetailsService } from '../services/product-details.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../services/order.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service'
import { environment } from '../../environment.stage';

@Component({
  selector: 'app-billing-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoryBarComponent,
    FooterComponent,
    HeaderBarComponent,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.css',
})
export class BillingDetailsComponent {
  billingForm!: FormGroup;
  product: any;
  productId!: string;
  bidId!: string;
  userId: string | null = null;
  bidAmount!: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductDetailsService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.readBiddingPageState();
  }

  ngOnInit() {
    this.authService.getUserId().subscribe(uid => {
      this.userId = uid;
      console.log('User ID:', this.userId);
    });
    this.billingForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      streetAddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/),
        ],
      ],
      orderNotes: [''],
      paymentMethod: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]], // Assuming 16 digits for simplicity
      expirationDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]], // Assuming MM/YY format
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]], // Assuming 3-digit CVV
      cardholderName: ['', Validators.required]
    });
    this.productService.getProduct(this.productId).subscribe((data) => {
      this.product = data;
    });
  }

  onSubmit() {
    if (this.billingForm.valid) {
      const paymentToken = this.generateRandomToken();
      const orderWithoutCardInfo = {
        billingDetails: {
          firstName: this.billingForm.value.firstName,
          lastName: this.billingForm.value.lastName,
          streetAddress: this.billingForm.value.streetAddress,
          state: this.billingForm.value.state,
          city: this.billingForm.value.city,
          zipcode: this.billingForm.value.zipcode,
          orderNotes: this.billingForm.value.orderNotes,
          paymentMethod: this.billingForm.value.paymentMethod,
          paymentToken: paymentToken,
        },
        productId: this.productId,
        bidId: this.bidId,
        userId: this.userId,
        amount: this.bidAmount,
      };
      this.sendTokenToBackend(paymentToken,this.bidAmount,this.userId,this.productId);

      this.orderService.submitOrder(orderWithoutCardInfo).subscribe({
        next: (response) => {
          this.snackBar.open('Order submitted successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          this.snackBar.open('Error submitting order', 'Close', {
            duration: 3000,
          });
        },
      });

    } else {
      this.billingForm.markAllAsTouched();
      this.snackBar.open('Form is not valid', 'Close', { duration: 3000 });
    }
  }

  generateRandomToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
  sendTokenToBackend(paymentToken: string, amount: any, userId: any, productId: any) {
    const endpointUrl = `${environment.apiUrl}/processPayment`; // Replace with your backend endpoint URL
    this.http.post(endpointUrl, { token: paymentToken, amount: amount, userId:userId, productId:productId  })
      .subscribe(
        response => {
          console.log('Token sent to backend successfully:', response);
          this.snackBar.open('Payment success', 'Close', {
            duration: 3000,
          });
          // Handle backend response if needed
        },
        error => {
          console.error('Error sending token to backend:', error);
          this.snackBar.open('Error submitting order', 'Close', {
            duration: 3000,
          });
          // Handle error
        }
      );
  }
  readBiddingPageState() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      productId: string;
      bidId: string;
      bidAmount: number;
    };
    if (state) {
      this.productId = state.productId;
      this.bidId = state.bidId;
      this.bidAmount = state.bidAmount;
    } else {
      this.router.navigate(['/']);
    }
  }
}
