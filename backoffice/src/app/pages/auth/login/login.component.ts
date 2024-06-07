import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserApiResponse } from '../../interfaces/Iuser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  LoginForm!:FormGroup
  errorMessage!:string
  succesMessage!:string
  loader: boolean=false;

  constructor(private fb:FormBuilder,private authService:AuthService,private router: Router){

    this.LoginForm = this.fb.group({
      numero:["", [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      password:["", [Validators.required,Validators.minLength(6)]]
    })
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  onSubmit() {
    if (this.LoginForm.valid) {
      this.loader = true;
      const { numero, password } = this.LoginForm.value;
      this.authService.login({ phone_number: numero, password: password }).subscribe(
        (response: UserApiResponse) => {
          if (response) {
            this.LoginForm.reset();
            const userData = response;

            localStorage.setItem('authAccess', userData.access);
            localStorage.setItem('authRefresh', userData.refresh);
            localStorage.setItem('authUser', JSON.stringify(userData));

            this.loader = false;
            this.succesMessage = "Connexion réussie avec succès!";
            this.router.navigate(['/content/home']);
          }
        },
        (error: any) => {
          console.error(error);
          this.loader = false;
          Swal.fire({
            title: 'Error!',
            text: 'Impossible de se connecter !',
            icon: 'error',
            confirmButtonText: 'ok',
            timer: 4000,
            timerProgressBar:true
          })
        }
      );
    }
  }



}
