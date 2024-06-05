import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;

  constructor(private apiService: ApiService) { }

  login(data: { phone_number: string, password: string }): Observable<any> {
    return this.apiService.postItem(data, 'users/login/');
  }

  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem("Djassa2Refrech");
    return !!token; // Convertit en boolean (true si token existe, false sinon)
  }

  logout(): void {
    localStorage.removeItem("DjassaAuthUser");
    localStorage.removeItem("Djassa2Access");
    this.isAuthenticated = false;
  }

  getUser(): any | null {
    const authUser = localStorage.getItem("DjassaAuthUser");
    return authUser ? JSON.parse(authUser) : null;
  }

  getRefreshToken(): any {
    return localStorage.getItem("Djassa2Refrech");
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.apiService.postItem({ refresh: refreshToken }, 'users/token/refresh/').pipe(
        map((response: any) => response),
        catchError((error: any) => {
          console.error('Failed to refresh token', error);
          return throwError(error);
        })
      );
    } else {
      return throwError('No refresh token available');
    }
  }
}
