import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoginService, Profile } from '../../services/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class EditProfileComponent implements OnInit {
  editProfileForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    birthDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.minLength(6)),
    confirmPassword: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    const profile = this.loginService.profiles.find(p => p.username === username);
    if (profile) {
      const birthDate = profile.birthDate ? new Date(profile.birthDate) : null;
      if (birthDate && !isNaN(birthDate.getTime())) {
        this.editProfileForm.patchValue({
          firstname: profile.firstname,
          lastname: profile.lastname,
          username: profile.username,
          birthDate: birthDate.toISOString().split('T')[0],
          address: profile.address
        });
      } else {
        this.editProfileForm.patchValue({
          firstname: profile.firstname,
          lastname: profile.lastname,
          username: profile.username,
          address: profile.address
        });
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.editProfileForm.valid) {
      const { firstname, lastname, username, birthDate, address, newPassword, confirmPassword } = this.editProfileForm.getRawValue();

      if (newPassword && newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const birthDateAsDate = new Date(birthDate!); // Convert to Date object
      const profile = this.loginService.profiles.find(p => p.username === username);
      const updatedProfile: Profile = {
        firstname: firstname!,
        lastname: lastname!,
        username: username!,
        email: profile?.email || '', // Include email in the updated profile
        isAdmin: profile?.isAdmin || false,
        birthDate: birthDateAsDate,
        address: address!
      };

      const result = await this.loginService.updateProfile(updatedProfile, newPassword || undefined);
      if (result) {
        const redirectRoute = this.loginService.loggedInProfile?.username === username ? '/home' : '/all-users';
        this.router.navigate([redirectRoute]);
      } else {
        alert('Update failed. Please try again.');
      }
    }
  }
}
