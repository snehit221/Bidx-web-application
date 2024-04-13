// Shahroz Ahmad

import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule,
    CommonModule,
  ],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
})
export class CardViewComponent {
  @Input() products: any[] = [];

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
}
