// src/app/initializedFirebase.ts
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment.prod';

export const initializedFirebase = initializeApp(environment.firebaseConfig);
