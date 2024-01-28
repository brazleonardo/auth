import { Routes } from '@angular/router';
import { LayoutComponent } from '@@components/layout/layout.component';
import { LayoutAuthComponent } from '@@components/layout-auth/layout-auth.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';
import { Page404Component } from './pages/page404/page404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/auth',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: LayoutAuthComponent,
    children: [
      {
        path: 'auth',
        component: LoginComponent
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
