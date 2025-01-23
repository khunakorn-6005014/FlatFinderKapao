import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { FlatService } from '../../services/flat.service';
import { Flat } from '../../models/flat.model';


@Component({
  selector: 'app-flat-table',
  templateUrl: './flat-table.component.html',
  styleUrls: ['./flat-table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ]
})
export class FlatTableComponent implements OnInit {
  displayedColumns: string[] = ['city', 'streetname', 'streetnumber', 'areasize', 'hasAC', 'yearbuilt', 'rentprice', 'dateavailable', 'isFavorite'];
  flats: Flat[] = [];
  filteredFlats: Flat[] = [];
  cityFilter: string = '';
  priceRange: { min: number; max: number } = { min: 0, max: 0 };
  areaSizeRange: { min: number; max: number } = { min: 0, max: 0 };

  constructor(private flatService: FlatService) {}

  ngOnInit(): void {
    this.flatService.getFlats().subscribe(data => {
      this.flats = data;
      this.filteredFlats = data;
    });
  }

  filterFlats() {
    this.filteredFlats = this.flats.filter(flat =>
      (this.cityFilter === '' || flat.city.includes(this.cityFilter)) &&
      (this.priceRange.min === 0 || flat.rentprice >= this.priceRange.min) &&
      (this.priceRange.max === 0 || flat.rentprice <= this.priceRange.max) &&
      (this.areaSizeRange.min === 0 || flat.areasize >= this.areaSizeRange.min) &&
      (this.areaSizeRange.max === 0 || flat.areasize <= this.areaSizeRange.max)
    );
  }

  sortFlats(sortKey: 'city' | 'rentprice' | 'areasize') {
    this.filteredFlats.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });
  }

  toggleFavorite(flat: Flat) {
    this.flatService.toggleFavorite(flat);
  }
}
