import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';

import { AuthService } from '@@services/auth.service';
import { environment } from '@@environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(`${environment.appName}_token`);
  const  authService = inject(AuthService);
  const router = inject(Router);

  req = req.clone({
    url: `${environment.apiUrl}/${req.url}`,
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  });

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.signOut();
        router.navigateByUrl('user/auth');
        return throwError(() => error);
      }

      return throwError(() => error);
    })
  );
};
