import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { initializedFirebase } from '../initializedFirebase';
import { getAuth, UserCredential } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export interface Profile {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  birthDate?: Date;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  profiles: Profile[] = [];
  loggedInProfile: Profile | null = null; 

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    if (!environment.production) {
      this.firestore.firestore.settings({ host: 'localhost:8080', ssl: false });
    }
    this.loadProfiles();
  }

  async loadProfiles(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getProfiles().subscribe({
        next: (result: Profile[]) => {
          this.profiles = result;
          console.log('Profiles loaded:', this.profiles);
          resolve();
        },
        error: (error: any) => {
          console.error('Error loading profiles', error);
          if (error.code === 'permission-denied') {
            console.error('Permission denied: Ensure your Firestore rules allow authenticated users to read data.');
          }
          reject(error);
        }
      });
    });
  }

  getProfiles(): Observable<Profile[]> {
    return this.firestore.collection<Profile>('profiles').valueChanges();
  }

  async register(email: string, password: string, birthDate: Date, address: string, firstname: string, lastname: string): Promise<boolean> {
    try {
      console.log('Starting registration process...');
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('User created:', userCredential.user?.uid);

      await this.firestore.collection('profiles').doc(userCredential.user?.uid).set({
        username: email,
        firstname: firstname,
        lastname: lastname,
        email: email,
        isAdmin: false,
        birthDate: birthDate,
        address: address
      });
      console.log('Profile saved to Firestore.');
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  }

  async updateProfile(updatedProfile: Profile, newPassword?: string): Promise<boolean> {
    try {
      // Update password 
      if (newPassword) {
        const user = await this.afAuth.currentUser;
        if (user) {
          await user.updatePassword(newPassword);
        }
      }
      // Update profile data in Firestore
      await this.firestore.collection('profiles').doc(updatedProfile.username).update(updatedProfile);
      
      const profileIndex = this.profiles.findIndex(profile => profile.username === updatedProfile.username);
      if (profileIndex !== -1) {
        this.profiles[profileIndex] = { ...this.profiles[profileIndex], ...updatedProfile };
      }
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    }
  }

  async tryLogin(username: string, password: string): Promise<Profile | null> {
    try {
      console.log('Attempting login.');
      
      // Ensure profiles are loaded before attempting to log in
      await this.loadProfiles();
      
      const userCredential = await this.afAuth.signInWithEmailAndPassword(username, password);
      console.log('User successfully authenticated:', userCredential.user?.uid);
  
      // Ensure the user is authenticated
      if (userCredential.user) {
        console.log('User is authenticated:', userCredential.user.uid);
  
        // Fetch the profile associated with the authenticated user
        const profile = this.profiles.find(item => item.username === username);
        if (profile) {
          this.loggedInProfile = profile;
          console.log('Profile found:', profile);
          return profile;
        } else {
          console.error('Profile not found for user:', username);
        }
      } else {
        console.error('User is not authenticated');
      }
      return null;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  }
  //
  tryFbLogin(username: string, pwd: string): Promise<UserCredential> {
    const auth = getAuth(initializedFirebase);
    const email = username;
    const password = pwd;
    return signInWithEmailAndPassword(auth, email, password);
  }
}

