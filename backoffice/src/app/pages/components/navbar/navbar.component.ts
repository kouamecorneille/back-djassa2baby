import { Component, ElementRef, ViewChild } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @ViewChild('contentWrapper') contentWrapper!: ElementRef;

  constructor(private themeService: ThemeService) {}


 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.themeService.initTheme();
 }


 toggleTheme(): void {
  this.themeService.toggleTheme();
}

isDarkMode(): boolean {
  return this.themeService.getCurrentMode() === 'dark';
}

isLightMode(): boolean {
  return this.themeService.getCurrentMode() === 'light';
}



}
