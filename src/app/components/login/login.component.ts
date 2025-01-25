import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService, private router: Router) {}

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      try {
        console.log('Attempting login.');
        this.loginService.tryFbLogin(username!, password!)
          .then((_) => {
            console.log('Login successful, navigating to home');
            this.router.navigate(['/home']);
          })
          .catch((_) => {
            alert('Login failed. Try again.');
          });
      } catch (_) {
        alert('Something went wrong.');
      }
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
