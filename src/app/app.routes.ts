import { Routes } from '@angular/router';

import { signInGuard } from '@@guards/sign-in.guard';
import { authGuard } from './guards/auth.guard';

import { LayoutComponent } from '@@components/layout/layout.component';
import { LayoutAuthComponent } from '@@components/layout-auth/layout-auth.component';

import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';

import { Page404Component } from './pages/page404/page404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: LayoutAuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [signInGuard]
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/admin/home/home.component'),
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/admin/profile/profile.component'),
        canActivate: [authGuard],
      },
    ]
  },
  {
    path: '**',
    component: Page404Component,
    pathMatch: 'full'
  },
];
