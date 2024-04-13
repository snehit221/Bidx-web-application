import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, ScrollingModule, CommonModule, MatMenuModule, MatIconModule]
})
export class CategoryBarComponent {
  categories: string[] = [
    'Electronics', 'Books', 'Clothing', 'Home & Garden', 'Sports', 'Collectibles', 'Art', 'Vehicles'
  ];
  isMobile: boolean = window.innerWidth < 768;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 768;
  }
}
