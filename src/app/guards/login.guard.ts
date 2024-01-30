import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LocalStorageService } from '@@services/local-storage.service';
import { environment } from '@@environments/environment';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorage = inject(LocalStorageService);
  const hasToken = !!localStorage.get(`${environment.appName}_token`);

  if(hasToken && state.url === '/user/auth'){
    return router.navigateByUrl('home');
  }

  return true;
};
