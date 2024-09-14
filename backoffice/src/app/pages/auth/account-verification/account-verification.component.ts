import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-verification.component.html',
  styleUrl: './account-verification.component.css'
})
export class AccountVerificationComponent {

  securityCodeForm: FormGroup;
  loading:boolean = false;
  apiService = inject(ApiService)
  shop_id!:string

  constructor(private fb: FormBuilder,private router: Router) {
    this.securityCodeForm = this.fb.group({
      code1: ['', [Validators.required, Validators.maxLength(1)]],
      code2: ['', [Validators.required, Validators.maxLength(1)]],
      code3: ['', [Validators.required, Validators.maxLength(1)]],
      code4: ['', [Validators.required, Validators.maxLength(1)]],
      code5: ['', [Validators.required, Validators.maxLength(1)]],
      code6: ['', [Validators.required, Validators.maxLength(1)]],
    });

    this.shop_id = localStorage.getItem('shop_id')!;
  }

  // Fonction pour passer automatiquement au champ suivant
 moveToNext(event: any, currentField: string, nextField?: string, previousField?: string): void {
  const input = event.target as HTMLInputElement;

  // Check if the backspace key is pressed and the current field is empty
  if (event.key === 'Backspace' && input.value.length === 0) {
    // Move to the previous field if it exists
    if (previousField) {
      const previousInput = document.querySelector(`input[formControlName=${previousField}]`) as HTMLElement;
      if (previousInput) {
        previousInput.focus();
      }
    }
  } else if (input.value.length === 1) {
    // If the input field is filled with one character, move to the next field
    if (nextField) {
      const nextInput = document.querySelector(`input[formControlName=${nextField}]`) as HTMLElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
}



   // Gérer la soumission du formulaire
   onSubmit(): void {
    if (this.securityCodeForm.valid) {
      this.loading = true;
      const securityCode = Object.values(this.securityCodeForm.value).join('');

      const data = {

        otp:securityCode,
        shop_id:this.shop_id

      }

      this.apiService.postItem(data, '/verify-otp/').subscribe(
        (response:any)=>{
          localStorage.removeItem('shop_id' )
          console.log(response)

          if(response){
            this.loading = false;
            Swal.fire({
              title: 'Verification de compte!',
              text: 'Votre compte a bien été verifier !',
              icon: 'success',
              timer: 4000,
              timerProgressBar:true
            });

            this.router.navigate(['/auth/login']);

          }

        }
      ),
      (error:any)=>{
        this.loading = false;
        if(error.status==403){

            Swal.fire({
              title: 'Verification de compte!',
              text: 'Le code de validation entrer a expiré !',
              icon: 'success',
              timer: 4000,
              timerProgressBar:true
            });

        }else if(error.status==404){

            Swal.fire({
              title: 'Verification de compte!',
              text: 'Le code de validation entrer a expiré !',
              icon: 'success',
              timer: 4000,
              timerProgressBar:true
            });

            this.router.navigate(['/auth/login']);

        }else{

          Swal.fire({
            title: 'Impossible de valider votre compte pour le moment!',
            text: 'Le code de validation entrer a expiré !',
            icon: 'success',
            timer: 4000,
            timerProgressBar:true
          });
        }
      }
      // Logique de vérification du code ici
    } else {
      console.log('Formulaire invalide');
    }
  }

  resendOtp(): void {
      const data = {
        shop_id:this.shop_id,
      }

      this.apiService.postItem(data, '/resend-otp/').subscribe(
        (response:any)=>{

          if(response){

            Swal.fire({
              title: 'Verification de compte!',
              text: 'Nous venons de vous envoyer un mail contenant le code Otp !',
              icon: 'success',
              timer: 4000,
              timerProgressBar:true
            });

            this.router.navigate(['/auth/login']);

          }

        }
      ),
      (error:any)=>{

       console.log(error);
      }
      // Logique de vérification du code ici
  }
}
