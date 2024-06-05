import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule,BreadcrumbComponent],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {

}
