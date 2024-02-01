import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from '@@services/auth.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent {
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
