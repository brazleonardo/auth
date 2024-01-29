import { Component, inject } from '@angular/core';

import { AuthService } from '@@services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  protected authService = inject(AuthService);

  constructor() {
    this.getUser();
  }

  getUser(){
    this.authService.me().subscribe({
      next: (response) => {
        console.log(response)
      }
    });
  }
}
