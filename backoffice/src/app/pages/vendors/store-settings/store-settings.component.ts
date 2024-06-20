import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { StoreInfosComponent } from '../store-infos/store-infos.component';
import { UserProfilComponent } from '../../auth/user-profil/user-profil.component';
import { ChangePasswordComponent } from '../../auth/change-password/change-password.component';

@Component({
  selector: 'app-store-settings',
  standalone: true,
  imports: [BreadcrumbComponent,StoreInfosComponent,UserProfilComponent,ChangePasswordComponent],
  templateUrl: './store-settings.component.html',
  styleUrl: './store-settings.component.css'
})
export class StoreSettingsComponent {

}
