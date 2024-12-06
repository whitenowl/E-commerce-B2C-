import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from '../../services/auth.service';
import { Router,RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule, // Add CommonModule here
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formbuilder = inject(FormBuilder);
  registerForm = this.formbuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(5)]],
  });

  authService = inject(AuthService);
  router = inject(Router);
  errorMessage: string | null = null;

  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }
  
    const value = this.registerForm.value;
  
    this.authService.register(value.name!, value.email!, value.password!)
      .pipe(
        catchError((error) => {
          if (error.status === 409) {
            // Updated error message
            this.errorMessage = 'This email is already registered.';
            // Reset the password field
            this.registerForm.get('password')?.reset();
            this.registerForm.get('email')?.reset();

          } else {
            this.errorMessage =
              error.error.message || 'This email is already registered.';
            this.registerForm.get('password')?.reset();
            this.registerForm.get('email')?.reset();

          }
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) {
          alert('User registered successfully!');
          this.router.navigateByUrl('/login');
        }
      });
  }
}  
