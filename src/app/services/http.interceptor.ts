import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '@@environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  req = req.clone({
    url: `${environment.apiUrl}/${req.url}`
  });

  return next(req);
};
