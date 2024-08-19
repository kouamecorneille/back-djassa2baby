import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule,BreadcrumbComponent,RouterModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {

  ecommService = inject(EcommerceService)

  constructor(){

    this.ecommService.getVendorOrders()
  }

}
