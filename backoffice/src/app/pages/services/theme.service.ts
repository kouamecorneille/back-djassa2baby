import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'mode';

  constructor() {}

  initTheme(): void {
    if (typeof localStorage !== 'undefined') {

        const savedMode = localStorage.getItem(this.storageKey);
        if (savedMode) {
          this.applyMode(savedMode);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.applyMode('dark');
        } else {
          this.applyMode('light');
        }

    }

  }

  toggleTheme(): void {
    const currentMode = this.getCurrentMode();
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    this.applyMode(newMode);
  }

   applyMode(mode: string): void {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(mode);
    localStorage.setItem(this.storageKey, mode);
  }

   getCurrentMode(): string {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }
}
