import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './app/material/material.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]),
    importProvidersFrom(
      BrowserAnimationsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      AppRoutingModule
    ),
    provideHttpClient(withFetch())
  ]
}).catch(err => console.error(err));
 /*
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import '@angular/compiler';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));

 */