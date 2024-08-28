import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { Product } from '../../services/shop/interfaces/Iproduct';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-campagne',
  standalone: true,
  imports:[BreadcrumbComponent,ReactiveFormsModule, CommonModule,FormsModule,NgSelectModule],
  templateUrl: './campagne.component.html',
  styleUrl: './campagne.component.css'
})
export class CampagneComponent {

  products  = new BehaviorSubject<Product[]>([]);
  private ecomService = inject(EcommerceService);
  selectedProducts = [];

  constructor() {

    this.ecomService.getVendorProducts()
    this.ecomService.listOfProducts.subscribe(
      (data) => {

        this.products.next(data);
      }
    )
  }

}
