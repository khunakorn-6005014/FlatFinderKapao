import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.profile = this.loginService.profiles.find(p => p.username === username) || null;
  }

  getFormattedDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  isAdmin(): boolean {
    return this.loginService.loggedInProfile?.isAdmin || false;
  }

  canEditProfile(): boolean {
    return this.loginService.loggedInProfile?.username === this.profile?.username || this.isAdmin();
  }
  
  onEditProfile(): void {
    if (this.profile) {
      this.router.navigate(['/edit-profile', this.profile.username]);
    }
  }
  
}
