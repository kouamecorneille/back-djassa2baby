import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { Coupon } from '../../interfaces/Icoupon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule,BreadcrumbComponent,RouterModule, ReactiveFormsModule],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.css'
})
export class CouponsComponent {

  couponForm!: FormGroup;
  loading:boolean=false;
  ecommerceService = inject(EcommerceService)
  coupon_code!:string;
  is_update:boolean = false;
  selected_Coupon!:Coupon;

  constructor(private fb: FormBuilder){

    this.couponForm = this.fb.group({
      // coupon_code: ['', Validators.required],
      reduction: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      is_active: [true],
    });


  }

  ngOnInit(){

    this.ecommerceService.getVendorCoupons()

  }

  selectedCoupon(item:Coupon){

    this.is_update = true;
    this.selected_Coupon = item;
    this.couponForm.patchValue({
      reduction:item.reduction.split('.')[0],
      start_date:item.start_date,
      end_date:item.end_date,
      is_active:item.is_active,
    })

  }


  generateCouponCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let couponCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters[randomIndex];
    }

    return couponCode;
  }

  deleteItem(item:Coupon) {

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
        this.ecommerceService.deleteCoupon(item.id).subscribe(
          (response:any)=>{
            console.log(response)
            this.ecommerceService.getVendorCoupons()
            Swal.fire({
              title: "Suppression de coupon !",
              text: "Le coupon a été bien supprimer !",
              icon: "success",
              timer:4000,
              timerProgressBar:true
            });
          },
          (error:any)=>{

            console.log(error);
            Swal.fire({
              title: "Suppression de coupon !",
              text: "Oops, une erreur interne du serveur !",
              icon: "error",
              timer:4000,
              timerProgressBar:true
            });
          }
        )
      }else{

        Swal.fire({
          title: "Suppression de coupon !",
          text: "La suppression a été annuler.",
          icon: "warning",
          timer:4000,
          timerProgressBar:true
        });
      }
    });

  }

  onSubmit(){
    this.loading = true
    if(this.couponForm.valid){

      const data = {
        coupon_code: this.generateCouponCode(8),
        reduction: this.couponForm.value.reduction,
        start_date: this.couponForm.value.start_date,
        end_date: this.couponForm.value.end_date,
        is_active: this.couponForm.value.is_active,
        shop: this.ecommerceService.connectedStore.id
      }

      if(this.is_update){

        this.ecommerceService.updateCoupon(data, this.selected_Coupon.id).subscribe(
          (response : Coupon[])=>{

            if(response){
              this.loading = false
              this.couponForm.reset()
              this.ecommerceService.getVendorCoupons()
              Swal.fire({
                title: 'Modification de coupon !',
                text: 'Le coupon a bien été modifié avec succès !',
                icon: 'success',
                timer: 4000,
                timerProgressBar:true
              })
            }
          },
          (error:any)=>{

            this.loading = false
            console.log(error)
            Swal.fire({
              title: 'Modification de coupon !',
              text: 'Nous avons rencontrer une erreur !',
              icon: 'error',
              timer: 4000,
              timerProgressBar:true
            })
          }
        )



      }else{
        this.ecommerceService.addCoupon(data).subscribe(
          (response : Coupon[])=>{

            if(response){
              this.loading = false
              this.couponForm.reset()
              this.ecommerceService.getVendorCoupons()
              Swal.fire({
                title: 'Ajout de coupon !',
                text: 'Le coupon a bien été créer !',
                icon: 'success',
                timer: 4000,
                timerProgressBar:true
              })


            }
          },
          (error:any)=>{

            this.loading = false
            console.log(error)
            Swal.fire({
              title: 'Ajout de coupon !',
              text: 'Nous avons rencontrer une erreur !',
              icon: 'error',
              timer: 4000,
              timerProgressBar:true
            })
          }
        )

      }


    }
  }
}
