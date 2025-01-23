import { Component , ViewChild} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule 
  ]
})
export class AppComponent {
  title = 'FlatFinder';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
