// @author - KaushikChanabhaiDhola
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environment.stage';

@Component({
  selector: 'app-confirmationdialog',
  standalone: true,
  imports: [],
  templateUrl: './confirmationdialog.component.html',
  styleUrl: './confirmationdialog.component.css'
})
export class ConfirmationdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(productId: string): void {
    const deleteUrl = `${environment.apiUrl}/products/delete/${productId}`;
    this.http.delete(deleteUrl).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.dialogRef.close(true);
        this.snackBar.open('Product deleted successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.error('Error deleting product:', error);
        this.snackBar.open('Error deleting product. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
