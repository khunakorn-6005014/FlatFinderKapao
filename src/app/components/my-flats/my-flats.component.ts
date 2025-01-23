import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FlatService } from '../../services/flat.service';
import { Flat } from '../../models/flat.model';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FlatDetailsComponent } from '../flat-details/flat-details.component';
import { EditFlatComponent } from '../edit-flat/edit-flat.component';

@Component({
  selector: 'app-my-flats',
  templateUrl: './my-flats.component.html',
  styleUrls: ['./my-flats.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    FlatDetailsComponent,
    EditFlatComponent
  ]
})
export class MyFlatsComponent implements OnInit {
  displayedColumns: string[] = ['city', 'streetname', 'streetnumber', 'areasize', 'hasAC', 'yearbuilt', 'rentprice', 'dateavailable', 'actions'];
  flats: Flat[] = [];
  selectedFlatInfo: Flat | null = null;
  FlatEdit: Flat | null = null;
  flatForm: FormGroup;
  FlatEditForm!: FormGroup; // Use definite assignment assertion

  constructor(private flatService: FlatService) {
    this.flatForm = new FormGroup({
      city: new FormControl('', Validators.required),
      streetname: new FormControl('', Validators.required),
      streetnumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      areasize: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      hasAC: new FormControl(false),
      yearbuilt: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')]),
      rentprice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      dateavailable: new FormControl('', Validators.required)
    });

    // Initialize FlatEditForm
    this.FlatEditForm = new FormGroup({
      city: new FormControl('', Validators.required),
      streetname: new FormControl('', Validators.required),
      streetnumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      areasize: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      hasAC: new FormControl(false),
      yearbuilt: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')]),
      rentprice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      dateavailable: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.flatService.getFlats().subscribe(data => {
      this.flats = data;
    });
  }

  addNewFlat() {
    if (this.flatForm.valid) {
      const newFlat: Flat = this.flatForm.value;
      this.flatService.addFlat(newFlat);
      this.flatForm.reset();
      this.flats.push(newFlat);
    } else {
      alert('Please fill out all required fields.');
    }
  }

  viewFlat(flat: Flat) {
    console.log('Viewing flat:', flat);
    this.selectedFlatInfo = flat;
  }

  editFlat(flat: Flat) {
    console.log('Editing flat:', flat);
    if (this.FlatEditForm) {
      this.FlatEdit = flat; // Initialize FlatEdit
      this.FlatEditForm.patchValue(flat); // Populate form with the flat details
    }
  }

  closeModal() {
    this.selectedFlatInfo = null;
  }

  closeEditModal() {
    this.FlatEdit = null;
  }

  deleteFlat(flat: Flat) {
    this.flatService.deleteFlat(flat);
    this.flats = this.flats.filter(f => f !== flat);
  }
}
