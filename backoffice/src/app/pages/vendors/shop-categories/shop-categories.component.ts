import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { EcommerceService } from '../../services/shop/ecommerce.service';

@Component({
  selector: 'app-shop-categories',
  standalone: true,
  imports: [RouterModule, BreadcrumbComponent, CommonModule],
  templateUrl: './shop-categories.component.html',
  styleUrl: './shop-categories.component.css'
})
export class ShopCategoriesComponent {


  ecommService = inject(EcommerceService)

  constructor(){

    this.ecommService.getFavoritesCategorie()

  }


}
