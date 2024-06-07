import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { StoreInfosComponent } from '../store-infos/store-infos.component';
import { UserProfilComponent } from '../../auth/user-profil/user-profil.component';

@Component({
  selector: 'app-store-settings',
  standalone: true,
  imports: [BreadcrumbComponent,StoreInfosComponent,UserProfilComponent],
  templateUrl: './store-settings.component.html',
  styleUrl: './store-settings.component.css'
})
export class StoreSettingsComponent {

}
