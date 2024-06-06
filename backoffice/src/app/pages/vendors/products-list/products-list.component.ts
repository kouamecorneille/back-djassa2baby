import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { FormBuilder } from '@angular/forms';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { Product } from '../../services/shop/interfaces/Iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterModule, BreadcrumbComponent, CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  listOfProducts:Product[]=[]
  baseUrl:string='http://djassa2baby.pythonanywhere.com/'
  constructor(private fb: FormBuilder,private ecomService:EcommerceService) {

  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ecomService.getVendorProducts()
    this.ecomService.listOfProducts.subscribe(
      (data)=>{
        this.listOfProducts = data
      }
    )
  }

}
