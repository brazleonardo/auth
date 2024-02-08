import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { LocalStorageService } from '@@services/local-storage.service';
import { environment } from '@@environments/environment';
import { Auth } from '@@interfaces/auth';
import { User } from '@@interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private localStorage = inject(LocalStorageService);
  private router = inject(Router);
  public isAutheticated = signal(false);

  constructor() {
    this.isAutheticated.set(!!this.localStorage.get(`${environment.appName}_token`));
  }

  signIn(username: string, password: string){
    const data = {username, password, expiresInMins: 60};
    return this.http.post<Auth>('auth/login', data);
  }

  me(){
    return this.http.get<User>('auth/me');
  }

  onAutheticate(value: boolean){
    this.isAutheticated.set(value);
  }

  signOut(){
    this.localStorage.remove(`${environment.appName}_token`);
    this.router.navigateByUrl('/auth/sign-in');
  }

}
