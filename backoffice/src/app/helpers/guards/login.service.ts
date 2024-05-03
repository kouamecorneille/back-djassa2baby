import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/auth/authenticate.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private router:Router, private authService:AuthenticateService) { }

  canActivateFn():boolean{

    if(this.authService.isAuthenticatedUser()){
      return true;
    }else{
      this.router.navigate(['/auth/login']);
      return false;
      
    }
  }
}
