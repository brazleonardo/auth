import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LocalStorageService } from '@@services/local-storage.service';
import { environment } from '@@environments/environment';

export const signInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorage = inject(LocalStorageService);
  const hasToken = !!localStorage.get(`${environment.appName}_token`);

  if(hasToken && state.url === '/auth/sign-in'){
    return router.navigateByUrl('home');
  }

  return true;
};
