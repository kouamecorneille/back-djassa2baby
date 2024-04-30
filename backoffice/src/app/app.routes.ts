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
      path: 'vendors/settings',
      component:SettingsComponent
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
    }


];
