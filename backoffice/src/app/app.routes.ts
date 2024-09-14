import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashbordComponent } from './pages/vendors/dashbord/dashbord.component';
import { AddProductsComponent } from './pages/vendors/add-products/add-products.component';
import { ProductsListComponent } from './pages/vendors/products-list/products-list.component';
import { OrdersListComponent } from './pages/vendors/orders-list/orders-list.component';
import { OrdersPendingComponent } from './pages/vendors/orders-pending/orders-pendingcomponent';
import { TransactionsComponent } from './pages/vendors/transactions/transactions.component';
import { ReviewsComponent } from './pages/vendors/reviews/reviews.component';
import { PackagesVendorsComponent } from './pages/vendors/packages-vendors/packages-vendors.component';
import { NotificationsComponent } from './pages/vendors/notifications/notifications.component';
import { StatisticsComponent } from './pages/vendors/statistics/statistics.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SupportComponent } from './pages/vendors/support/support.component';
import { StoreSettingsComponent } from './pages/vendors/store-settings/store-settings.component';
import { AuthGuard } from './helpers/guards/auth.guard';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { EditProductsComponent } from './pages/vendors/edit-products/edit-products.component';
import { RegisterBoutiqueComponent } from './pages/auth/register-boutique/register-boutique.component';
import { PasswordResetConfirmComponent } from './pages/auth/password-reset-confirm/password-reset-confirm.component';
import { ProductReviewsDetailsComponent } from './pages/vendors/product-reviews-details/product-reviews-details.component';
import { CouponsComponent } from './pages/vendors/coupons/coupons.component';
import { DetailsOrderComponent } from './pages/vendors/details-order/details-order.component';
import { SubscribersComponent } from './pages/vendors/subscribers/subscribers.component';
import { ShopCategoriesComponent } from './pages/vendors/shop-categories/shop-categories.component';
import { CampagneComponent } from './pages/vendors/campagne/campagne.component';
import { AccountVerificationComponent } from './pages/auth/account-verification/account-verification.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register-boutique',
    component: RegisterBoutiqueComponent
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'auth/account-verification',
    component: AccountVerificationComponent
  },
  {
    path: 'auth/password-reset-confirm',
    component: PasswordResetConfirmComponent
  },
  {
    path: 'content',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: DashbordComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'packages-vendors',
        component: PackagesVendorsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'statistics-sale',
        component: StatisticsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/add-product',
        component: AddProductsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/edit-product/:slug',
        component: EditProductsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/list-of-products',
        component: ProductsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/list-of-orders',
        component: OrdersListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/list-of-orders-pending',
        component: OrdersPendingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/list-paiements',
        component: TransactionsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/list-reviews',
        component: ReviewsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/support',
        component: SupportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/settings',
        component: StoreSettingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/compagnes',
        component: CampagneComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/user-reviews',
        component: ReviewsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/coupons',
        component: CouponsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/subscribers',
        component: SubscribersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/categorie-favorites',
        component: ShopCategoriesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/reviews-list/:id',
        component: ProductReviewsDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vendors/details-order/:id',
        component: DetailsOrderComponent,
        canActivate: [AuthGuard]
      },
    ]
  },


];
