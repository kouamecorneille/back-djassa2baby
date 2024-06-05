import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SettingsComponent,HeaderComponent,SidebarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SettingsComponent,HeaderComponent,SidebarComponent]
})
export class SharedModule { }
