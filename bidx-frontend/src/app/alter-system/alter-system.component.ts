// @author - KaushikChanabhaiDhola
import { Component, OnInit } from '@angular/core';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {  HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../environment.stage';

@Component({
  selector: 'app-alter-system',
  standalone: true,
  imports: [HeaderBarComponent,
    FooterComponent,
    CategoryBarComponent,
    MatFormFieldModule,
    MatSelectModule,CommonModule,RouterModule],
  templateUrl: './alter-system.component.html',
  styleUrl: './alter-system.component.css'
})
export class AlterSystemComponent implements OnInit {
  selectedValue: number | string = '10';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];
  products: any;
  userId: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  ngOnInit() {
    this.loadProducts();
    this.calculatePages();
  }

  calculatePages() {
    const totalItems = this.products.length;
    console.log(totalItems);
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    console.log(totalPages);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  loadProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    this.http.get<any[]>(`${environment.apiUrl}/products/getAllProducts`, {
      params: {
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString()
      }
    }).subscribe(
      (products) => {
        this.products = products;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
  
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.loadProducts();
  }

  onChangeNotifications() {
    if (this.selectedValue === 'all') {
      console.log("on click of show"+this.products.length);
      this.itemsPerPage = this.products.length;
    } else {
      this.itemsPerPage = +this.selectedValue; 
      console.log("on click of selectedValue"+this.itemsPerPage);
    }
    this.currentPage = 1;
    this.calculatePages();
  }
}
