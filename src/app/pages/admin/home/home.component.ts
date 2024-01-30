import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from '@@services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  protected authService = inject(AuthService);

  constructor() {
    this.getUser();
  }

  getUser(){
    this.authService.me().subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }

}
