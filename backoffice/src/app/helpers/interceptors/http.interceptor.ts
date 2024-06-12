import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../pages/services/auth/auth.service';
import { Token } from '../../pages/interfaces/Iuser';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('authAccess');
  const router = inject(Router)
  const authService = inject(AuthService)


  // Clone the request and add the authentication token to the headers if available
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Handle 401 Unauthorized error
        Swal.fire({
          title: "Expiration de session",
          text: "Voulez prolonger votre session ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui, confirmer!",
          cancelButtonText:"Non, annuler"
        }).then((result) => {
          if (result.isConfirmed) {

            authService.refreshToken().pipe(
              switchMap((response: Token) => {
                // Une fois que vous avez obtenu le nouveau jeton, modifiez la demande actuelle pour inclure ce jeton
                localStorage.setItem('authAccess', response.access)
                localStorage.setItem('authRefresh', response.refresh)

                const authReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.access}`
                  }
                });

                // Réessayez la demande avec le nouveau jeton
                return next(authReq);
              }),
              catchError((error: any) => {
                // Gérer les erreurs de renouvellement du jeton
                console.error('Failed to refresh token', error);
                // Vous pouvez rediriger vers la page de connexion ou effectuer une autre action appropriée
                return throwError(error);
              })
            )

          } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: "Expiration de session",
              text: "Vous serrez rediriger vers lapage de connexion :)",
              icon: "error"
            });

          router.navigate(['/auth/login'])

          }
        });



        // Optionally, you could redirect to a login page or refresh the token here
      }
      // Pass the error to the caller of the service
      return throwError(error);
    })
  );


};
