import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-store-settings',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './store-settings.component.html',
  styleUrl: './store-settings.component.css'
})
export class StoreSettingsComponent {

}
