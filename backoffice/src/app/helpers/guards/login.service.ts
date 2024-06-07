import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../pages/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private router:Router, private authService:AuthService) { }

  canActivateFn():boolean{

    if(this.authService.isAuthenticatedUser()){
      return true;
    }else{
      this.router.navigate(['/auth/login']);
      return false;

    }
  }
}
