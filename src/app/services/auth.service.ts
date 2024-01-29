import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  public isAutheticate = signal(false);

  signIn(username: string, password: string){
    const data = {username, password};
    return this.http.post<Auth>('auth/login', data);
  }

  onAutheticate(value: boolean){
    this.isAutheticate.set(value);
  }

}
