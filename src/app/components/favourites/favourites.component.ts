import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FlatService } from '../../services/flat.service';
import { Flat } from '../../models/flat.model';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { FlatDetailsComponent } from '../flat-details/flat-details.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    FormsModule,
    FlatDetailsComponent
  ]
})
export class FavouritesComponent implements OnInit {
  displayedColumns: string[] = ['city', 'streetname', 'streetnumber', 'areasize', 'hasAC', 'yearbuilt', 'rentprice', 'dateavailable', 'actions'];
  favourites: Flat[] = [];
  selectedFlatInfo: Flat | null = null;

  constructor(private flatService: FlatService) {}

  ngOnInit(): void {
    this.flatService.getFavouriteFlats().subscribe(data => {
      this.favourites = data;
    });
  }

  viewFlat(flat: Flat) {
    console.log('Viewing flat:', flat);
    this.selectedFlatInfo = flat;
  }
  closeModal() {
    this.selectedFlatInfo = null;
  }

  removeFavourite(flat: Flat) {
    this.flatService.toggleFavorite(flat);
    this.favourites = this.favourites.filter(f => f.isFavorite);
  }
}
