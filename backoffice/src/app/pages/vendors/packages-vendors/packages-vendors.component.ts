import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { UserApiResponse } from '../../interfaces/Iuser';
import { SubscriptionPlan } from '../../interfaces/princing.model';

@Component({
  selector: 'app-packages-vendors',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule],
  templateUrl: './packages-vendors.component.html',
  styleUrl: './packages-vendors.component.css'
})
export class PackagesVendorsComponent {

  ecomService = inject(EcommerceService);
  currentPlan:string
  userSession: UserApiResponse | null;

  constructor(private authService: AuthService) {

    this.userSession = this.authService.UserSession!;
    this.currentPlan = this.userSession.shop?.subscription!

  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ecomService.getPlans()
    console.log(this.ecomService._listOfPlan)
  }


  trackById(index: number, item: SubscriptionPlan): string {
    return item.id;
  }



}
