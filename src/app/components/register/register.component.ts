import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    birthDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService, private router: Router) {}

  async onRegister(): Promise<void> {
    if (this.registerForm.valid) {
      const { firstname, lastname, username, password, birthDate, address } = this.registerForm.value;

      
      if (birthDate) {
        const birthDateAsDate = new Date(birthDate as string); 
        try {
          console.log('Submitting registration form...');
          const result = await this.loginService.register(username!, password!, birthDateAsDate, address!, firstname!, lastname!);
          if (result) {
            console.log('Registration successful, navigating to login...');
           // Added more debug info
           console.log('User Information:', { firstname, lastname, username, birthDate, address,password });
           console.log('Router:', this.router);
            this.router.navigateByUrl('/login');
            console.log('Navigation successful');
          } else {
            alert('Registration failed. Please try again.');
          }
        } catch (error) {
          console.error('Registration error:', error);
          alert('Registration failed due to  error. Please try again.');
        }
      } else {
        alert('Invalid birth date. Please provide a valid date.');
      }
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
