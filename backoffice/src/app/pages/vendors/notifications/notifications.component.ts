import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { FormBuilder } from '@angular/forms';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { Product } from '../../services/shop/interfaces/Iproduct';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule,BreadcrumbComponent,RouterModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

}
