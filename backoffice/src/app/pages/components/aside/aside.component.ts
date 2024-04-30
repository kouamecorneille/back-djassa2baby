import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../interfaces/IMenu';




@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {


  menuItems: MenuItem[] = [
    {
      icon: 'md-home',
      text: 'Dashboard',
      link: '/dashbord-sellers/home'
    },
    {
      icon: 'md-shopping_bag',
      text: 'Produits',

    },
    // Ajoutez d'autres éléments de menu ici...
  ];



}
