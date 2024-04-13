// @author - KaushikChanabhaiDhola
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { CommonModule } from '@angular/common';
import { ProductService } from './product-form.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    HeaderBarComponent,
    CategoryBarComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @ViewChild('productForm', { static: false }) productForm!: NgForm;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  productData: any = {
    productName: '',
    productDesc: '',
    bid: null,
    category: '',
    city: '',
    province: '',
    auctionDeadline: '',
    itemValue: ''
  };
  selectedFiles: File[] = [];

  onSubmit() {
    if (this.productForm.valid) {
      if (this.areRequiredFieldsFilled()) {
        // Get the current user ID from AuthService
        this.authService.getUserId().subscribe(
          (userId: any) => {
            this.productService.addProductWithImages(
              userId,
              this.productData,
              this.selectedFiles
            ).subscribe(
              () => {
                this.showMessage('Product added successfully!');
                this.productForm.reset();
                this.resetFileInput();
                this.selectedFiles = [];
              },
              (error) => {
                this.showMessage('Error adding product');
              }
            );
          },
          (error) => {
            this.showMessage('Error getting user ID');
          }
        );
      } else {
        this.showMessage('Please fill in all required fields, and select at least one image!');
      }
    } else {
      this.showMessage('Please fill in all required fields, and select at least one image.');
    }
  }

  areRequiredFieldsFilled(): boolean {
    return (
      this.productForm.value.productName &&
      this.productForm.value.productDesc &&
      this.productForm.value.bid &&
      this.productForm.value.category &&
      this.productForm.value.city &&
      this.productForm.value.province &&
      this.productData.auctionDeadline &&
      this.productData.itemValue !== null &&
      this.selectedFiles.length > 0
    );
  }

  onFileSelected(event: any) {
    const inputElement: HTMLInputElement = event.target;
    this.selectedFiles = [];
    if (inputElement.files) {
      for (let i = 0; i < inputElement.files.length; i++) {
        this.selectedFiles.push(inputElement.files[i]);
      }
    }
  }

  resetFileInput() {
    const fileInput = this.fileInput.nativeElement as HTMLInputElement;
    fileInput.value = '';
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
