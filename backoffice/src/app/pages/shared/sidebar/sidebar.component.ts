import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Note the change from styleUrl to styleUrls
})
export class SidebarComponent implements AfterViewInit {

  @ViewChild('sidebartoggler', { static: true }) sidebarToggler!: ElementRef;

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
    console.log('close sidebar')
    if (this.isSidebarOpen) {
      this.isSidebarOpen = false;
      this.dataTheme = 'full';
      this.updateSidebarClasses();
    }
  }
}