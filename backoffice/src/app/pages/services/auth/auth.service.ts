import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { DOCUMENT } from '@angular/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticate:boolean = false
  constructor(private apiService:ApiService, @Inject(DOCUMENT) private document: Document) { }

    /**
   * The `login` method in the `AuthenticateService` class is a function that takes an object as a parameter with properties
   * `username` and `password`, both of type `string`. This method is used to send a POST request to the API service
   * (`apiService`) with the provided data to authenticate a user login. The `postItem` method of the `apiService` is called
   * with the data and the endpoint `'login'` as parameters.
   *
   * @method
   * @name login
   * @kind method
   * @memberof AuthenticateService
   * @param {{ username: string password: string }} data
   * @returns {Observable<any>}
   */
    login(data:{phone_number:string, password:string}): Observable<any>{

      return this.apiService.postItem(data, 'users/login/');
    }

    /**
     * @method
     * @name isAuthenticatedUser
     * @kind method
     * @memberof AuthenticateService
     * @returns {boolean}
     */
    isAuthenticatedUser(): boolean {
      const localStorage = document.defaultView?.localStorage;

      if (localStorage) {
        const token = localStorage.getItem("Djassa2Refrech");

        // Check if token exists
        if (token) {
          return true; // User is authenticated
        } else {
          return false; // Token is missing or invalid
        }
      } else {
        // Handle case where localStorage is not available (e.g., in certain environments)
        return false; // Assume user is not authenticated if localStorage is unavailable
      }
    }



    /**
     * @method
     * @name logout
     * @kind method
     * @memberof AuthenticateService
     * @returns {void}
     */
    logout():void{
      localStorage.removeItem("DjassaAuthUser");
      localStorage.removeItem("Djassa2Access");
      this.isAuthenticate = false
    }

    getUser(): any | null {
      const authUser = localStorage.getItem("DjassaAuthUser");
      if (authUser !== null) {
        return JSON.parse(authUser);
      } else {
        return null;
      }
    }

    getRefrechToken():any {
      if (typeof localStorage !== 'undefined') {
        // Your code that uses localStorage
        const token = localStorage.getItem("Djassa2Refrech")
        return token;

      } else {
          console.error('localStorage is not supported in this environment');
      }

    }


    refreshToken(): Observable<any> {
      const refreshToken = this.getRefrechToken()
      if (refreshToken) {
        return this.apiService.postItem({refresh: refreshToken},'users/token/refresh/').pipe(

          map((response: any) => {
            // Gérez la réponse de votre backend ici
            // Par exemple, si le serveur renvoie un nouveau jeton, vous pouvez l'extraire et le retourner
            return response; // Supposons que votre backend renvoie un jeton d'accès avec la clé 'accessToken'
          }),

          catchError((error: any) => {
            // Gérez les erreurs de la requête HTTP ici
            console.error('Failed to refresh token', error);
            return throwError(error);
          })
          
        );

      } else {
        // Gérez le cas où aucun jeton de rafraîchissement n'est disponible dans le local storage
        return throwError('No refresh token available');
      }
    }


}
