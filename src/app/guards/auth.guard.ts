import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { LocalStorageService } from '@@services/local-storage.service';
import { environment } from '@@environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalStorageService);
  const hasToken = !!localStorage.get(`${environment.appName}_token`);

  return hasToken;
};
