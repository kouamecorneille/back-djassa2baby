import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { FormBuilder } from '@angular/forms';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { Product } from '../../services/shop/interfaces/Iproduct';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
  constructor(private fb: FormBuilder,private ecomService:EcommerceService, private router:Router) {

  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadData()
  }

  loadData(){

    this.ecomService.getVendorProducts()
    this.ecomService.listOfProducts.subscribe(
      (data)=>{
        this.listOfProducts = data
      }
    )


  }

  navigateToEditProduct(slug: string) {
    this.router.navigate(['/content/vendors/edit-product', slug]);
  }


  deleteItem(item:Product) {

    Swal.fire({
      title: "Ètes vous sur de cette action ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      // confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Oui, Supprimer!",
      cancelButtonText:'Non, annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ecomService.deleteProduct(item.slug).subscribe(
          (response:any)=>{
            console.log(response)
            this.loadData()
            Swal.fire({
              title: "Suppression de produit !",
              text: "Le produit a été bien supprimer !",
              icon: "success",
              timer:4000,
              timerProgressBar:true
            });
          },
          (error:any)=>{

            console.log(error);
            Swal.fire({
              title: "Suppression de produit !",
              text: "Oops, une erreur interne du serveur !",
              icon: "error",
              timer:4000,
              timerProgressBar:true
            });
          }
        )
      }else{

        Swal.fire({
          title: "Suppression de produit !",
          text: "La suppression a été annuler.",
          icon: "warning",
          timer:4000,
          timerProgressBar:true
        });
      }
    });

  }
}
