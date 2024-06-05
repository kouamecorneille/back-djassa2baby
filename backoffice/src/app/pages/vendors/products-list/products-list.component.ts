import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterModule, BreadcrumbComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

}
