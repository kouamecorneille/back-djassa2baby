import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/Iuser';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  passwordForm!:FormGroup
  loader:boolean = false;
  apiService = inject(ApiService)
  userSession: User | null;


  constructor( private fb:FormBuilder,private authService: AuthService,){

    this.passwordForm = this.fb.group({
      old_password:['', [Validators.required, Validators.minLength(6)]],
      new_password:['', [Validators.required, Validators.minLength(6)]],
      confirm_password:['', [Validators.required, Validators.minLength(6)]],
    });

    this.userSession = this.authService.UserSession?.user!;

  }


  onSubmit(){

    this.loader = true
    if(this.passwordForm.valid){

      if(this.passwordForm.value.confirm_password == this.passwordForm.value.new_password){

        const data ={
          old_password:this.passwordForm.value.old_password,
          new_password:this.passwordForm.value.new_password,
        }

        this.apiService.putPassword(data,'users/password-change').subscribe(
          (response:any)=>{

            if(response){

              this.loader = false
              Swal.fire({
                title: 'Modification du mot de passe !',
                text: 'Votre mot de passe a été mise a jour !',
                icon: 'success',
                timer: 4000,
                timerProgressBar:true
              });

            }
          },
          (error:any)=>{
            console.log(error)
            this.loader = false
            Swal.fire({
              title: 'Modification du mot de passe !',
              text: 'Oops, erreur interne du serveur',
              icon: 'error',
              timer: 4000,
              timerProgressBar:true
            });
          }
        )

      }else{
        this.loader = false
        Swal.fire({
          title: 'Modification du mot de passe !',
          text: 'Les deux mot de passe ne correspondent pas !',
          icon: 'error',
          timer: 4000,
          timerProgressBar:true
        });

      }

    }
  }
}
