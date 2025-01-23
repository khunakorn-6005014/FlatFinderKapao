import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flat } from '../models/flat.model';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private flats: Flat[] = [
    { city: "South Hectorside", streetname: "Jackie Village", streetnumber: 7892, areasize: 56, hasAC: true, yearbuilt: 1500, rentprice: 500, dateavailable: new Date("2024-12-01") },
    { city: "Dakotabury", streetname: "Allison Heights", streetnumber: 5606, areasize: 53, hasAC: false, yearbuilt: 1200, rentprice: 600, dateavailable: new Date("2024-11-03") },
    { city: "South Michaelside", streetname: "Steele Roads", streetnumber: 6220, areasize: 87, hasAC: true, yearbuilt: 1100, rentprice: 650, dateavailable: new Date("2024-12-05") },
    { city: "Lake Lisa", streetname: "Joseph Fort", streetnumber: 9049, areasize: 49, hasAC: false, yearbuilt: 1300, rentprice: 700, dateavailable: new Date("2024-11-04") },
    { city: "New Tylerport", streetname: "Joseph Ports", streetnumber: 4682, areasize: 64, hasAC: true, yearbuilt: 1350, rentprice: 600, dateavailable: new Date("2025-01-02") },
    { city: "West Brittanybury", streetname: "Susan River", streetnumber: 6065, areasize: 29, hasAC: true, yearbuilt: 1400, rentprice: 700, dateavailable: new Date("2025-01-03") },
    { city: "Townsendchester", streetname: "Kelsey Walk", streetnumber: 4270, areasize: 83, hasAC: false, yearbuilt: 1250, rentprice: 600, dateavailable: new Date("2024-12-05") },
    { city: "Zacharyburgh", streetname: "Samantha Flat", streetnumber: 4386, areasize: 17, hasAC: false, yearbuilt: 1000, rentprice: 400, dateavailable: new Date("2024-12-01") },
    { city: "East Todd", streetname: "James Island", streetnumber: 3486, areasize: 67, hasAC: true, yearbuilt: 800, rentprice: 450, dateavailable: new Date("2024-11-07") },
    { city: "Port Jeremyside", streetname: "Rodney Springs", streetnumber: 8567, areasize: 14, hasAC: true, yearbuilt: 900, rentprice: 500, dateavailable: new Date("2024-11-15") },
    { city: "North Marissa", streetname: "Kevin Shoal", streetnumber: 2493, areasize: 59, hasAC: false, yearbuilt: 850, rentprice: 600, dateavailable: new Date("2024-11-17") },
    { city: "Port Richardhaven", streetname: "Calhoun Trail", streetnumber: 2006, areasize: 88, hasAC: false, yearbuilt: 700, rentprice: 800, dateavailable: new Date("2024-12-16") },
    { city: "East Donaldland", streetname: "Carr Via", streetnumber: 7549, areasize: 64, hasAC: true, yearbuilt: 1400, rentprice: 600, dateavailable: new Date("2024-12-14") },
    { city: "Keybury", streetname: "Gomez Extension", streetnumber: 4931, areasize: 94, hasAC: true, yearbuilt: 1100, rentprice: 500, dateavailable: new Date("2024-12-02") },
    { city: "South Ashley", streetname: "Michael Mews", streetnumber: 5169, areasize: 61, hasAC: true, yearbuilt: 500, rentprice: 400, dateavailable: new Date("2024-11-03") }
  ];

  getFlats(): Observable<Flat[]> {
    return of(this.flats);
  }
  getFavouriteFlats(): Observable<Flat[]> {
    return of(this.flats.filter(flat => flat.isFavorite));
  }
  toggleFavorite(flat: Flat): void {
    flat.isFavorite = !flat.isFavorite;
  }
  addFlat(flat: Flat): void {
    this.flats.push(flat);
  }

  editFlat(flat: Flat): void {
    const index = this.flats.findIndex(f => f.city === flat.city && f.streetname === flat.streetname);
    if (index !== -1) {
      this.flats[index] = flat;
    }
  }

  deleteFlat(flat: Flat): void {
    this.flats = this.flats.filter(f => f !== flat);
  }
}
