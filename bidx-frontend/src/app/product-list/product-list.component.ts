// @author - KaushikChanabhaiDhola
import { Component, OnInit } from '@angular/core';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { CommonModule} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { ProductListService } from './product-list.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    HeaderBarComponent,
    FooterComponent,
    CategoryBarComponent,
    CommonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit {

  products: any[] = [];
  
  constructor(
    private productListService: ProductListService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProductsForCurrentUser();
  }

  loadProductsForCurrentUser(): void {
    this.authService.getUserId().subscribe(
      (userId: any) => {
        this.productListService.getProductsForCurrentUser(userId).subscribe(
          (products) => {
            this.products = products;
            console.log('Products:', this.products);
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting user ID:', error);
      }
    );
  }

  formatDate(dateArray: number[] | null): string {
    if (!dateArray || dateArray.length !== 7) {
      return ''; 
    }
    
    const [year, month, day, hour, minute, second, millisecond] = dateArray;
    const formattedMonth = this.padZero(month);
    const formattedDay = this.padZero(day);
    const formattedHour = this.padZero(hour);
    const formattedMinute = this.padZero(minute);
    const formattedSecond = this.padZero(second);

    const formattedDate = `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
    return formattedDate;
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  modifyProduct(product: any): void {
    console.log('Modifying product:', product.id);
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '400px',
      data: { productId: product.id, productData: { ...product } }
    });

    dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
        console.log('Product updated:', updatedProduct);
      }
    });
  }

  deleteProduct(product: any): void {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      width: '250px',
      panelClass: 'confirmation-dialog-container',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this product?',
        productId: product.id
      }
    });
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.products = this.products.filter(p => p !== product);
        this.showSnackbar('Product deleted successfully!');
      }
    });
  }
  
  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
