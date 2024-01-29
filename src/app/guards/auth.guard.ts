import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { environment } from '@@environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const hasToken = !!localStorage.getItem(`${environment.appName}_token`);

  if(!hasToken){
    const router = inject(Router);
    return router.navigateByUrl('/user/auth');
  }

  return hasToken;
};
