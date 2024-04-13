import { Component, HostListener, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../core/search.service';
import { AuthService } from '../auth.service';

/* @author - snehitroda */
/* @author - KaushikChanabhaiDhola */
@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatMenuModule, CommonModule, ContactUsComponent, FormsModule],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.css'
})
export class HeaderBarComponent implements OnInit {
  
  isSmallScreen: boolean = false;
  searchTerm: String = "";
  isLoggedIn = false;
  isSeller = false;
  isBuyer = false;

  menuOptions: string[] = [];

  constructor(private router: Router, private searchService: SearchService,private authService: AuthService) { }

  ngOnInit() {
    this.checkScreenSize();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isSeller = localStorage.getItem('role') === 'seller';
    this.isBuyer = localStorage.getItem('role') === 'buyer';
  }


  navigateToSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.searchService.setSearchTerm(this.searchTerm.trim());
      console.log("Going to search page with query: " + this.searchTerm);
      this.router.navigateByUrl('/search?query=' + encodeURIComponent(this.searchTerm.trim()));
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }


  private checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = window.innerWidth < 768;
    }
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  navigateToContactUs() {
    this.router.navigate(['/contact-us']);
  }

  navigateToFaq() {
    this.router.navigate(['/faq']);
  }

  // navigateToSignUp() {
  //   this.router.navigate(['/signup']);
  // }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToAddProducts() {
    this.router.navigate(['/addproduct']);
  }

  navigateToOrders() {
    this.router.navigate(['/orders']);
  }

  navigateToSellerOrders() {
    this.router.navigate(['/seller-orders']);
  }

  navigateToNotifications() {
    this.router.navigate(['/notifications']);
  }

  navigateToWishList() {
    this.router.navigate(['/wish-list']);
  }
  
  logout() {
    this.authService.logout();
  }

}
