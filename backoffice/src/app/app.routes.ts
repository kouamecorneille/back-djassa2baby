import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashbordComponent } from './pages/vendors/dashbord/dashbord.component';
import { SettingsComponent } from './pages/vendors/settings/settings.component';
import { AddProductsComponent } from './pages/vendors/add-products/add-products.component';
import { ProductsListComponent } from './pages/vendors/products-list/products-list.component';
import { OrdersListComponent } from './pages/vendors/orders-list/orders-list.component';
import { OrdersPendingComponent } from './pages/vendors/orders-pending/orders-pendingcomponent';
import { TransactionsComponent } from './pages/vendors/transactions/transactions.component';
import { ReviewsComponent } from './pages/vendors/reviews/reviews.component';
import { PackagesVendorsComponent } from './pages/vendors/packages-vendors/packages-vendors.component';
import { NotificationsComponent } from './pages/vendors/notifications/notifications.component';
import { StatisticsComponent } from './pages/vendors/statistics/statistics.component';
import { SettingsDashboardComponent } from './pages/vendors/settings-dashboard/settings-dashboard.component';
import { StoreListVendorComponent } from './pages/vendors/store-list-vendor/store-list-vendor.component';

export const routes: Routes = [

    {
      path:'',
      redirectTo:'home',
      pathMatch:'full'
    },
    {
      path: 'home',
      component:DashbordComponent
    },

    {
      path: 'packages-vendors',
      component:PackagesVendorsComponent
    },
    {
      path: 'notifications',
      component:NotificationsComponent
    },
    {
      path: 'statistics-sale',
      component:StatisticsComponent
    },
    {
      path: 'vendors/add-product',
      component:AddProductsComponent
    },
    {
      path: 'vendors/list-of-products',
      component:ProductsListComponent
    },
    {
      path: 'vendors/list-of-orders',
      component:OrdersListComponent
    },
    {
      path: 'vendors/list-of-orders-pending',
      component:OrdersPendingComponent
    },
    {
      path: 'vendors/list-paiements',
      component:TransactionsComponent
    },
    {
      path: 'vendors/list-reviews',
      component:ReviewsComponent
    },
    {
      path: 'vendors/settings',
      component:SettingsDashboardComponent,
      children:[
        {
          path:'',
          redirectTo:'profile',
          pathMatch:'full'
        },
        {
          path:'profile',
          component:SettingsComponent
        },
        {
          path:'list-stores',
          component:StoreListVendorComponent
        }

      ]
    },

];
