import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FlatTableComponent } from './components/flat-table/flat-table.component';
import { MyFlatsComponent } from './components/my-flats/my-flats.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { FlatDetailsComponent } from './components/flat-details/flat-details.component';
import { EditFlatComponent } from './components/edit-flat/edit-flat.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    ///
    
    HeaderComponent,
    LoginComponent,
    FlatTableComponent,
    MyFlatsComponent,
    FavouritesComponent,
    FlatDetailsComponent,
    EditFlatComponent
  ],
  providers: [
    provideHttpClient(withFetch()),
    { provide: SETTINGS, useValue: environment.production ? {} : { host: 'localhost:8080', ssl: false } }
  ],
})
export class AppModule { }

