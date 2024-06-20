import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-packages-vendors',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './packages-vendors.component.html',
  styleUrl: './packages-vendors.component.css'
})
export class PackagesVendorsComponent {

}
