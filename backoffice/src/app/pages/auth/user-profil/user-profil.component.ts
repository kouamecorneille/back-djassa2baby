import { Component } from '@angular/core';
import { User } from '../../interfaces/Iuser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent {

  userSession: User | null;
  userForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.userSession = this.authService.UserSession?.user!;

    console.log("USer :",this.userSession)
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
    })

  }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.setUserData()
  }

  setUserData(){

   if(this.userSession){
      this.userForm.patchValue({
        first_name:this.userSession?.first_name,
        last_name:this.userSession?.last_name,
        email:this.userSession?.email,
        phone_number:this.userSession?.phone_number,
      })
   }
  }



}
