import { Component, signal, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router } from '@angular/router'
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

import { AuthService } from '@@services/auth.service'
import { LocalStorageService } from '@@services/local-storage.service'
import { environment } from '@@environments/environment'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  hide = true
  isLoading = signal(false)
  protected loginForm!: FormGroup
  protected authService = inject(AuthService)
  protected localStorage = inject(LocalStorageService)

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('kminchelle', [Validators.required]),
      password: new FormControl('0lelplR', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value
      this.isLoading.set(true)
      this.authService.signIn(username, password).subscribe({
        next: (response) => {
          this.localStorage.set(`${environment.appName}_token`, response.token)
          this.isLoading.set(false)
          this.authService.onAutheticate(true)
          this.router.navigateByUrl('/admin/products')
        },
      })
    }
  }
}
