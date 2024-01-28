import { Routes } from '@angular/router';
import { LayoutComponent } from '@@components/layout/layout.component';
import { LayoutAuthComponent } from '@@components/layout-auth/layout-auth.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { Page404Component } from './pages/page404/page404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: LayoutAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
      }
    ]
  },
  {
    path: '**',
    component: Page404Component
  },
];
