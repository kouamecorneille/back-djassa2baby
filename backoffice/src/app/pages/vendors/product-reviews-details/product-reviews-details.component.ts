import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { ProductReview } from '../../services/shop/interfaces/IReviews';
import { Product } from '../../services/shop/interfaces/Iproduct';

@Component({
  selector: 'app-product-reviews-details',
  standalone: true,
  imports: [RouterModule, BreadcrumbComponent, CommonModule],
  templateUrl: './product-reviews-details.component.html',
  styleUrl: './product-reviews-details.component.css'
})
export class ProductReviewsDetailsComponent {

  private activeRoute = inject(ActivatedRoute)
  private ecommService = inject(EcommerceService)
  listOfProductReview :ProductReview [] = [];
  productId!:string
  productDetails!:Product

  constructor(){

    this.productId = this.activeRoute.snapshot.paramMap.get('id') ?? '';

  }


  ngOnInit(){

    this.getAllReviews()
    this.getProductDetails()

  }


  getAllReviews(){

    this.ecommService.getProductReviews(this.productId).subscribe(
      (response:ProductReview[])=>{
        if(response){

          this.listOfProductReview = response

        }
      }
    )

  }

  getProductDetails(){

    this.ecommService.getProductDetails(this.productId).subscribe(
      (response:Product)=>{
        if(response){

          this.productDetails = response;
        }

      }
    )
  }

}
