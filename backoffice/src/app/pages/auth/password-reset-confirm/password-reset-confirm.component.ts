import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-reset-confirm',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ,RouterModule],
  templateUrl: './password-reset-confirm.component.html',
  styleUrl: './password-reset-confirm.component.css'
})
export class PasswordResetConfirmComponent {

  passwordForm:FormGroup
  loader:boolean=false

  constructor(private fb:FormBuilder, private apiService:ApiService){

    this.passwordForm = this.fb.group({
      email:["",[Validators.required,Validators.email]]
    })
  }

  onSubmit(){

    this.loader = true
    const data ={
      email:this.passwordForm.value.email
    }

    this.apiService.postItem(data, "users/password-reset/").subscribe(
      (response:any)=>{
        if(response){
          this.loader = false
          Swal.fire({
            title: 'Réinitialisation de mot de passe !',
            text: 'Nous vous avons un email le lien de réinitialisation',
            icon: 'success',
            confirmButtonText: 'ok',
            timer: 4000,
            timerProgressBar:true
          })

        }
      },
      (error:any)=>{
        this.loader = false
        if(error.status==400){

          Swal.fire({
            title: 'Oops, erreur !',
            text: 'Les données saisie sont invalide !',
            icon: 'error',
            confirmButtonText: 'ok',
            timer: 4000,
            timerProgressBar:true
          })

        }else{

          Swal.fire({
            title: 'Oops, erreur !',
            text: 'Nous avons rencontrer une erreur !',
            icon: 'error',
            confirmButtonText: 'ok',
            timer: 4000,
            timerProgressBar:true
          })

        }
      }
    )

  }
}
