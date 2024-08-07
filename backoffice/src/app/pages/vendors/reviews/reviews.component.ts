import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { FormBuilder } from '@angular/forms';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { Product } from '../../services/shop/interfaces/Iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [RouterModule, BreadcrumbComponent, CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

}
