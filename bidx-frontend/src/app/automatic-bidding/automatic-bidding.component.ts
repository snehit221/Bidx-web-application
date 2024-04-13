// Shahroz Ahmad

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { FooterComponent } from '../footer/footer.component';

export interface BidHistory {
  userId: string;
  bidAmount: number;
  bidDate: string;
}

const BID_HISTTORY_DATA: BidHistory[] = [
  { userId: 'shahroz90', bidAmount: 6000, bidDate: '2023/02/12' },
  { userId: 'noob20', bidAmount: 5300, bidDate: '2023/02/11' },
  { userId: 'ubaid50', bidAmount: 5200, bidDate: '2023/02/11' },
  { userId: 'hackerX', bidAmount: 5000, bidDate: '2023/02/10' },
];

@Component({
  selector: 'app-automatic-bidding',
  standalone: true,
  imports: [
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    HeaderBarComponent,
    CategoryBarComponent,
    FooterComponent,
  ],
  templateUrl: './automatic-bidding.component.html',
  styleUrl: './automatic-bidding.component.css',
})
export class AutomaticBiddingComponent {
  displayedColumns: string[] = ['userId', 'bidAmount', 'bidDate'];
  dataSource = BID_HISTTORY_DATA;
  bidAmountValidations: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.bidAmountValidations = this.formBuilder.group({
      bidAmount: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.bidAmountValidations = this.formBuilder.group({
      bidAmount: ['', [Validators.required]],
    });
  }
}
