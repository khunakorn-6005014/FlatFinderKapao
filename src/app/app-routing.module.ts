import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FlatTableComponent } from './components/flat-table/flat-table.component';
import { MyFlatsComponent } from './components/my-flats/my-flats.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-profile/:username', component: ProfileComponent },
  { path: 'search-flats', component: FlatTableComponent },
  { path: 'my-flats', component: MyFlatsComponent },
  { path: 'edit-profile/:username', component: EditProfileComponent }, 
  { path: 'favourites', component: FavouritesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
