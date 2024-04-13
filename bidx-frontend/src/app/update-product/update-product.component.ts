// @author - KaushikChanabhaiDhola

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment.stage';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
  ],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  productData: any; 
  productImages: any[] = [];

  constructor(
    private snackBar: MatSnackBar,  
    private http: HttpClient,  
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
    this.productData = { ...data.productData }; 
  }

  onImageChange(event: any): void {
    this.productImages = [];
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.productImages.push({ url: e.target.result, file: files[i] });
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  removeImage(index: number): void {
    this.productImages.splice(index, 1);
  }

  submitUpdate(): void {
    const productId = this.productData.id;
    console.log('Updating product with ID:', productId);
    const updateUrl = `${environment.apiUrl}/products/update/${productId}`;
    
    const formData = new FormData();
    formData.append('name', this.productData.name);
    formData.append('description', this.productData.description);
    formData.append('category', this.productData.category);
  
    for (const image of this.productImages) {
      formData.append('images', image.file); 
    }
    
    this.http.post(updateUrl, formData).subscribe(
      (response) => {
        console.log('Product updated:', response);
        this.dialogRef.close(response);
        this.showSnackbar('Product updated successfully!');
      },
      (error) => {
        console.error('Error updating product:', error);
        this.showSnackbar('Error updating product. Please try again.');
      }
    );
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
