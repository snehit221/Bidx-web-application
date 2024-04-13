// Shahroz Ahmad

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { differenceInSeconds } from 'date-fns';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  formatDateTime,
  formatRemainingTime,
} from '../shared/utils/date-utils';
import { FooterComponent } from '../footer/footer.component';
import { BiddingService } from '../services/bidding.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { ProductDetailsService } from '../services/product-details.service';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { OrderService } from '../services/order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manual-bidding',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HeaderBarComponent,
    CategoryBarComponent,
    FooterComponent,
  ],
  templateUrl: './manual-bidding.component.html',
  styleUrl: './manual-bidding.component.css',
})
export class ManualBiddingComponent {
  loadedProductData: any = null;
  loadedProductImageUrl: string = '';

  auctionTimeLeft: string = '';
  hasAuctionEnded: boolean = false;

  currentUserBid: any = null;
  currentInputBidAmount: number = 0;

  activeBids: any[] = [];
  displayedColumns: string[] = ['userId', 'bidAmount', 'bidDate'];

  bidMessage: string = '';
  userId: string | null = null;

  constructor(
    private biddingService: BiddingService,
    private productDetailsService: ProductDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // Getting productId from URL
      const productId = params['productId'];
      if (productId) {
        this.authService.getUserId().subscribe((uid) => {
          this.userId = uid;
          // Refreshing Bids History table to load all the Active Bids
          this.refreshBids(productId);
          // Getting Product Details using productId
          this.productDetailsService.getProduct(productId).subscribe({
            next: (productData) => {
              this.loadedProductData = productData;
              if (this.loadedProductData.biddingConcluded) {
                this.auctionTimeLeft = '';
                this.hasAuctionEnded = true;
                this.checkBidStatus(this.loadedProductData.id, this.userId);
              } else {
                // Starting Auction Deadline Counter Down Timer
                this.runAuctionTimeCountDown(productData.auctionDeadline);
              }
              // Loading and Setting Image URL
              if (this.loadedProductData && this.loadedProductData.images) {
                const firstKey = Object.keys(this.loadedProductData.images)[0];
                const firstValue = this.loadedProductData.images[firstKey];
                this.setImageUrl(firstValue);
              }
            },
            error: (error) => {
              this.router.navigate(['/']);
            },
          });
        });
      }
    });
  }

  placeBid(event: Event): void {
    event.preventDefault();

    const bid = {
      bidType: 'manual',
      productId: this.loadedProductData.id,
      userId: this.userId,
      bidAmount: this.currentInputBidAmount,
      bidDate: new Date().toISOString(),
    };

    // Creating a Bid against userId and productId using Bid Details
    this.biddingService.createBid(bid).subscribe({
      next: (response) => {
        // Refreshing Bids to load all the Active/Updated Bids
        this.refreshBids(this.loadedProductData.id);
      },
      error: (error) => {
        console.error('Error placing bid', error);
      },
    });
  }

  refreshBids(productId: string): void {
    this.biddingService.getBidsByProductId(productId).subscribe((bidsData) => {
      // Sorting Bids by bidAmount Descending Order (also formatting bidDate)
      const sortedBids = bidsData
        .map((bid) => ({
          ...bid,
          bidDate: formatDateTime(bid.bidDate),
        }))
        .sort((a, b) => b.bidAmount - a.bidAmount);

      // Loading Active Bids for Rendering
      this.activeBids = sortedBids;

      // Finding Current User Bid Details
      this.currentUserBid = sortedBids.find(
        (bid) => bid.userId === this.userId
      );
    });
  }

  private runAuctionTimeCountDown(auctionDeadlineDateTime: number[]) {
    const dateString = formatDateTime(auctionDeadlineDateTime);
    const correctedDateString = dateString
      .replace(' at ', ', ')
      .replace(' ADT', '');
    const providedDate = new Date(correctedDateString);

    const countdownInterval = setInterval(() => {
      const currentDate = new Date();

      if (differenceInSeconds(providedDate, currentDate) <= 0) {
        clearInterval(countdownInterval);
        this.auctionTimeLeft = '';
        this.hasAuctionEnded = true;
        // API request to set bidConcluded to True
        this.productDetailsService
          .concludeBidding(this.loadedProductData.id)
          .subscribe({});

        // API request to update status of bids of all users
        this.biddingService
          .declareBidWinner(this.loadedProductData.id)
          .subscribe({});

        // Displaying Bid Status Message
        this.checkBidStatus(this.loadedProductData.id, this.userId);
      } else {
        this.auctionTimeLeft = formatRemainingTime(providedDate, currentDate);
      }
    }, 1000);
  }

  private checkBidStatus(productId: string, userId: string | null) {
    this.biddingService.getBidStatus(productId, userId).subscribe({
      next: (bid) => {
        if (bid.winningBid) {
          // Since bidding has concluded, now fetch the order details
          this.orderService
            .getOrdersByUserId(this.userId)
            .subscribe((orderData) => {
              // Check if an order exists for the product
              const productOrder = orderData.find(
                (order) => order.productId === this.loadedProductData.id
              );
              if (productOrder) {
                // Update UI to indicate that an order has been placed for this product
                this.bidMessage =
                  'Your order already has been placed for this product.';
              } else {
                this.bidMessage = 'Congratulations! You won the bid.';
              }
            });
        } else {
          this.bidMessage = 'Someone else won the bid.';
        }
      },
      error: () => console.error('Error fetching bid status'),
    });
  }

  private setImageUrl(gsUri: string): void {
    const matches = gsUri.match(/gs:\/\/([^\/]+)\/(.+)/);
    if (matches) {
      this.loadedProductImageUrl = `https://storage.googleapis.com/${matches[1]}/${matches[2]}`;
    }
  }

  navigateToBillingDetailsPage(event: MouseEvent) {
    event.preventDefault();
    this.router.navigate(['/billing-details'], {
      state: {
        productId: this.loadedProductData.id,
        bidId: this.currentUserBid.id,
        bidAmount: this.currentUserBid.bidAmount,
      },
    });
  }

  createImageUrl(imagesMap: Record<string, string>): string[] {
    if (imagesMap)
      return Object.values(imagesMap);
    
    return []
  }
}
