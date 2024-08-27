import { AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
import { UserApiResponse } from '../../interfaces/Iuser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Note the change from styleUrl to styleUrls
})
export class SidebarComponent implements AfterViewInit {

  private router = inject(Router)
  private authService= inject(AuthService)
  userSession: UserApiResponse | null;
  @ViewChild('sidebartoggler', { static: true }) sidebarToggler!: ElementRef;

  constructor() {
    this.userSession = this.authService.UserSession!;
  }
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.sidebarToggler.nativeElement.contains(event.target)) {
      this.closeSidebarIfOpen();
    }
  }

  ngAfterViewInit() {
    if (this.sidebarToggler) {
      // Perform actions using this.sidebarToggler
      this.updateSidebarClasses();
    } else {
      console.error('sidebarToggler is not yet available');
    }
  }

  isSidebarOpen = false;
  dataTheme = 'full'; // Assuming initial sidebar type is 'full'

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.dataTheme = this.isSidebarOpen ? 'mini-sidebar' : 'full';
    this.updateSidebarClasses();
  }

  updateSidebarClasses() {
    const mainWrapper = document.getElementById('main-wrapper');
    const sidebarMenus = document.querySelectorAll('.sidebarmenu');

    if (mainWrapper) {
      mainWrapper.classList.toggle('show-sidebar', this.isSidebarOpen);
    }

    sidebarMenus.forEach(el => el.classList.toggle('close', !this.isSidebarOpen));
  }

  closeSidebarIfOpen() {

    if (this.isSidebarOpen) {
      this.isSidebarOpen = false;
      this.dataTheme = 'full';
      this.updateSidebarClasses();
    }

  }

  logout(){

    localStorage.clear()

    Swal.fire({
      title: "Déconnexion du compte !",
      text: "Vous avez été déconnecter de votre session !",
      icon: "success",
      timer:4000,
      timerProgressBar:true
    });

    this.router.navigate(['/auth/login']);
  }
}
