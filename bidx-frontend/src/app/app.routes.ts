import { Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LandingComponent } from './landing/landing.component';
import { FaqComponent } from './faq/faq.component';
import { SearchComponent } from './search/search.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AlterSystemComponent } from './alter-system/alter-system.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ManualBiddingComponent } from './manual-bidding/manual-bidding.component';
import { AutomaticBiddingComponent } from './automatic-bidding/automatic-bidding.component';
import { SellerOrderListComponent } from './seller-order-list/seller-order-list.component';
import { SellerOrderDetailsComponent } from './seller-order-details/seller-order-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WishlistComponent } from './wishlist-list/wishlist-list.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'faq', component: FaqComponent },
    {  path: 'search/:searchTerm', component: SearchComponent  },
    {  path: 'search', component: SearchComponent  },
    {  path:  'addproduct', component:  ProductFormComponent },
    { path: 'products', component: ProductListComponent},
    { path: 'notifications', component: AlterSystemComponent},
    { path: 'billing-details', component: BillingDetailsComponent},
    { path: 'orders', component: OrderListComponent},
    { path: 'order-details/:id', component: OrderDetailsComponent},
    { path: 'seller-orders', component: SellerOrderListComponent},
    { path: 'seller-order-details/:id', component: SellerOrderDetailsComponent},
    { path: 'manual-bidding/:productId', component: ManualBiddingComponent},
    { path: 'automatic-bidding/:productId', component: AutomaticBiddingComponent},
    { path: 'product-detail/:id', component: ProductDetailsComponent },
    { path: 'wish-list', component: WishlistComponent },
];

export default routes;
