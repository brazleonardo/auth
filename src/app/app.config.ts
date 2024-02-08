import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";

import { httpInterceptor } from '@@services/http.interceptor';
import { getPaginatorIntl } from '@@helpers/matTranslate.helper';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([httpInterceptor])),
    {
      provide: MatPaginatorIntl,
      useFactory: getPaginatorIntl
    }
  ]
};
