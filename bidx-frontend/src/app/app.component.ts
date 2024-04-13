import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product-form/product-form.service';
import { ProductDetailsService } from './services/product-details.service';
import { ProductListService } from './product-list/product-list.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { OrderService } from './services/order.service';
import { BiddingService } from './services/bidding.service';
import { AuthService } from './auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat'
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    CommonModule,
    AngularFireAuthModule,
    AngularFireModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    ProductService,
    ProductListService,
    ProductDetailsService,
    OrderService,
    BiddingService,
    AuthService,
    AngularFireAuth,
    {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }    
    ]
})

export class AppComponent implements OnInit{
  title = 'bidx-frontend';

  constructor(private router: Router,private authService: AuthService) {}

  allowedRoutes: string[] = [
    '/billing-details',
    '/search?query=*',
    '/search',
    '/notifications',
    '/products',
    '/addproduct',
    '/product',
    '/orders',
    '/payment',
    '/bids',
    '/profile',
    '/settings',
    '/faq',
    '/contact-us',
    '/seller-orders',
    '/wish-list'
  ];

  dynamicRoutes: string[] = [
    '/order-details/',
    '/seller-order-details/',
    '/manual-bidding/',
    '/automatic-bidding/',
    '/search',
    '/product-detail/'
  ];
  
  dynamicRoutesWithoutLogIn: string[] = [
    '/search',
    '/product-detail/'
  ];

  NotallowedRoutes: string[] = [
    '/login',
    '/signup',
    '/search',
  ];

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const token = localStorage.getItem('userToken');
      const isLoggedIn = this.authService.isLoggedIn();

      const currentRoute = event.urlAfterRedirects;

      if (!token || !isLoggedIn) {
        if (!this.isNotRouteAllowed(currentRoute)) {
          this.router.navigate(['/']);
        }
      } else {
        if (!this.isRouteAllowed(currentRoute)) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  isNotRouteAllowed(route: string): boolean {
    const isDynamicRoute = this.dynamicRoutesWithoutLogIn.some(dynamicRoutesWithoutLogIn => route.startsWith(dynamicRoutesWithoutLogIn));
    if (isDynamicRoute) {
      return true;
    }
    return this.NotallowedRoutes.includes(route);
  }

  isRouteAllowed(route: string): boolean {
    const isDynamicRoute = this.dynamicRoutes.some(dynamicRoute => route.startsWith(dynamicRoute));
    if (isDynamicRoute) {
      return true;
    }

    return this.allowedRoutes.includes(route);
  }
}