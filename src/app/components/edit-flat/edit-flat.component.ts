import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flat } from '../../models/flat.model';
import { FlatService } from '../../services/flat.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-edit-flat',
  templateUrl: './edit-flat.component.html',
  styleUrls: ['./edit-flat.component.css'],
  standalone: true,
  imports: [ 
    CommonModule,// Include CommonModule 
     ReactiveFormsModule // Include ReactiveFormsModule 
     ] 
})
export class EditFlatComponent implements OnInit {
  @Input() FlatEdit: Flat| null = null; /// Changed to FlatEdit
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private flatService: FlatService) {
    this.editForm = this.fb.group({
      city: ['', Validators.required],
      streetname: ['', Validators.required],
      streetnumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      areasize: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      hasAC: [false],
      yearbuilt: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      rentprice: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dateavailable: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.FlatEdit) {
      this.editForm.patchValue(this.FlatEdit);
    }
  }

  updateFlat() {
    if (this.editForm.valid) {
      const updatedFlat: Flat = this.editForm.value;
      this.flatService.editFlat(updatedFlat);
      this.closeEditModal();
    }
  }

  closeEditModal() {
    this.FlatEdit = null; // Changed to FlatEdit
  }
}
