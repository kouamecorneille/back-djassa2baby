import { Component, inject } from '@angular/core';
import { CardInfosComponent } from '../components/card-infos/card-infos.component';
import { EcommerceService } from '../../services/shop/ecommerce.service';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports:[CardInfosComponent],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

  totaleProducts!:number;
  ecommService = inject(EcommerceService)

  constructor(){

    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ecommService.getVendorProducts()
    console.log(this.ecommService.listOfProducts.value)
    this.ecommService.listOfProducts.subscribe(
      (data)=>{
        this.totaleProducts = data.length;
      }
    )
  }
}
