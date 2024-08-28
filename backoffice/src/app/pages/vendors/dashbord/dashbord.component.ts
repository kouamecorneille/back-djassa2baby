import { Component, inject } from '@angular/core';
import { CardInfosComponent } from '../components/card-infos/card-infos.component';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports:[CardInfosComponent, CommonModule,RouterModule,BreadcrumbComponent],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

  totaleProducts!:number;
  ecommService = inject(EcommerceService)

  constructor(){

    this.ecommService.getVendorOrders()
    this.ecommService.getFavoritesCategorie()

  }

  ngOnInit(): void {

    this.ecommService.getVendorProducts()
    this.ecommService.listOfProducts.subscribe(
      (data)=>{
        this.totaleProducts = data.length;
      }
    )

    console.log(this.ecommService._listOfOrders)
  }
}
