import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserApiResponse } from '../../interfaces/Iuser';

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
    const token = localStorage.getItem("authUser");
    return !!token; // Convertit en boolean (true si token existe, false sinon)
  }

  logout(): void {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authAccess");
    this.isAuthenticated = false;
  }

  getUser(): UserApiResponse | null {
    const authUser = localStorage.getItem("authUser");
    return authUser ? JSON.parse(authUser) as UserApiResponse : null;
  }


  getRefreshToken(): any {
    return localStorage.getItem("authRefresh");
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
