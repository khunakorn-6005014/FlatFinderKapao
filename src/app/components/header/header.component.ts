import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule
  ]
})
export class HeaderComponent implements OnInit {
  @Output() public sideNavToggle = new EventEmitter<void>();
  isLoggedIn = false;
  
  // Change visibility to public
  constructor(public loginService: LoginService, private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        // Fetch the profile for the authenticated user
        this.loginService.loadProfiles().then(() => {
          this.loginService.loggedInProfile = this.loginService.profiles.find(p => p.username === user.email) || null;
          console.log('Authenticated User:', this.loginService.loggedInProfile);
        }).catch(error => {
          console.error('Error loading profiles:', error);
        });
      } else {
        console.log('No authenticated user found.');
      }
    });
  }
  

  onToggleSidenav(): void {
    this.sideNavToggle.emit();
  }

  onLogout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.afAuth.signOut().then(() => {
        this.router.navigate(['/home']);
      }).catch((error) => {
        console.error('Logout failed:', error);
      });
    }
  }
}
