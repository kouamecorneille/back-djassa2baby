import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-boutique',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register-boutique.component.html',
  styleUrl: './register-boutique.component.css'
})
export class RegisterBoutiqueComponent {

  // Déclaration du formulaire réactif

  shopForm: FormGroup;
  logo:any
  loading=false

  constructor(private formBuilder: FormBuilder, private apiService:ApiService, private router: Router) {
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
