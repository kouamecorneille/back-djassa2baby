import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorRequestsService } from './helpers/interceptors/interceptor-requests.service';
import { InterceptorResponseService } from './helpers/interceptors/interceptor-response.service';
import {  ToastrModule } from 'ngx-toastr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReactiveFormsModule } from '@angular/forms';

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
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'backoffice';
}
