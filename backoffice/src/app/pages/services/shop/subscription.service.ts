import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private apiService:ApiService, private authService:AuthService) { }


  checkSubscriptionStatus() {
    return this.apiService.getUrl('/check-subscription-status');
  }



}
