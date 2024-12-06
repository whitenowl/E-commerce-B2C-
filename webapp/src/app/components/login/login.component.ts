import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router,RouterLink} from '@angular/router';
import { catchError } from 'rxjs/operators';

import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formbuilder = inject(FormBuilder);

  loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  authService = inject(AuthService);
  router = inject(Router);

  errorMessage: string | null = null;

  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message || 'Invalid email or password.';
          this.loginForm.patchValue({ password: '' }); // Clear only the password field
          return of(null);
        })
      )
      .subscribe((result: any) => {
        if (result) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          this.router.navigateByUrl('/');
        }
      });
  }
}
