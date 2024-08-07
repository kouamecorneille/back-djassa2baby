import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Store } from '../../interfaces/Istore';
import { User, UserApiResponse } from '../../interfaces/Iuser';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-store-infos',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './store-infos.component.html',
  styleUrl: './store-infos.component.css'
})
export class StoreInfosComponent {

  shopForm: FormGroup;
  logo:any
  loading=false
  userSession: UserApiResponse | null;

  constructor(private authService: AuthService,private formBuilder: FormBuilder, private apiService:ApiService, private router: Router) {

    this.userSession = this.authService.UserSession!;
    this.shopForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number_1: ['',[Validators.required, Validators.minLength(10)]],
      phone_number_2: ['',Validators.minLength(10)],
      description: ['',[Validators.required,Validators.minLength(100)]],
      location: [''],
      facebook_link: [''],
      whatsapp_link: ['',[Validators.required,Validators.minLength(10)]],
      is_active: [true],
      can_evaluate: [false],
    });
  }



  ngOnInit(): void {
    console.log('this.userSession?.shop! :', this.userSession?.shop!)
    this.patchStoreInfo(this.userSession?.shop!)

  }

  patchStoreInfo(shop:Store){

    this.shopForm.patchValue({
      name:shop.name,
      phone_number_1:shop.phone_number_1,
      description:shop.description,
      location:shop.location,
      whatsapp_link:shop.whatsapp_link,
      facebook_link:shop.facebook_link,
      email:shop.email,
      can_evaluate:shop.can_evaluate,
    })

  }



  onSubmit(){

    this.loading = true;
    const form = new FormData()

    form.append('name',this.shopForm.value.name)
    form.append('email',this.shopForm.value.email)
    form.append('phone_number_1',this.shopForm.value.phone_number_1)
    form.append('phone_number_2',this.shopForm.value.phone_number_2)
    form.append('description',this.shopForm.value.description)
    form.append('location',this.shopForm.value.location)
    form.append('facebook_link',this.shopForm.value.facebook_link)
    form.append('whatsapp_link',this.shopForm.value.whatsapp_link)
    form.append('can_evaluate',this.shopForm.value.can_evaluate)

    this.apiService.postItem(form, 'shops').subscribe(
      (response:any) => {
        if(response){
          this.loading = false;
          Swal.fire({
            title: 'Création de boutique !',
            text: 'Votre boutique a été créer  avec succès !',
            icon: 'error',
            timer: 5000,
            timerProgressBar:true
          })

          this.router.navigate(['/auth/login']);
        }
      },
      (error:any) => {
        this.loading = false;
        console.log(error)
        Swal.fire({
          title: 'Création de boutique !',
          text: 'Nous avons rencontrer une erreur !',
          icon: 'error',
          confirmButtonText: 'ok',
          timer: 4000,
          timerProgressBar:true
        })
      }
    )


  }



  OnSelectLogo(event:any){

    console.log(event.target.files[0]);
    if(event){

      const logo = event.target.files[0]

      this.logo = logo
    }

  }

}
