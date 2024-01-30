import { Routes } from '@angular/router';

import { loginGuard } from '@@guards/login.guard';
import { authGuard } from './guards/auth.guard';

import { LayoutComponent } from '@@components/layout/layout.component';
import { LayoutAuthComponent } from '@@components/layout-auth/layout-auth.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { Page404Component } from './pages/page404/page404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/auth',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: LayoutAuthComponent,
    children: [
      {
        path: 'auth',
        component: LoginComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component'),
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component'),
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
