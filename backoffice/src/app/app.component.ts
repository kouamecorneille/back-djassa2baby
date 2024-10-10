import { Component, inject,OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorRequestsService } from './helpers/interceptors/interceptor-requests.service';
import { InterceptorResponseService } from './helpers/interceptors/interceptor-response.service';
import {  ToastrModule } from 'ngx-toastr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReactiveFormsModule } from '@angular/forms';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// // for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { UpdateService } from './pages/services/update.service';
import { SubscriptionService } from './pages/services/shop/subscription.service';
import Swal from 'sweetalert2';
import { AuthService } from './pages/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutComponent,
    ToastrModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    // for Router use:
    LoadingBarRouterModule,//
    // for HttpClient use:
    LoadingBarHttpClientModule,
    LoadingBarModule,
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorRequestsService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorResponseService,
      multi:true
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit, AfterViewInit{
  title = 'backoffice';
  updateService = inject(UpdateService)
  authService = inject(AuthService)

  constructor(private subscriptionService: SubscriptionService, private router: Router) {

  }

  ngOnInit() {
    // Réinitialiser l'indicateur après le rechargement
    this.updateService.checkForUpdates();
    if(this.authService.isAuthenticatedUser()){
      this.subscriptionService.checkSubscriptionStatus().subscribe(

        (response) => {
          if (response.status === 'expired') {

            Swal.fire({
              title: 'Abonnement babyShop!',
              text: 'Votre abonnement a expiré pour ce mois !',
              icon: 'warning',
              timer: 4000,
              timerProgressBar: true
            });



            this.router.navigate(['/content/packages-vendors']);

          }
        },
        (error) => {
          console.error('Error checking subscription status', error);
          // Handle error, maybe redirect to an error page
        }
      )
    }

  }

  ngAfterViewInit(): void {
    if (navigator.userAgent.indexOf('iPhone') > -1) {
      document?.querySelector("[name=viewport]")?.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1")
    }
  }


}
