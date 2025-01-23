import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatService } from '../../services/flat.service';
import { Flat } from '../../models/flat.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-flat-details',
  templateUrl: './flat-details.component.html',
  styleUrls: ['./flat-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class FlatDetailsComponent implements OnInit {
  @Input() flatInfo: Flat = {
    city: '',
    streetname: '',
    streetnumber: 0,
    areasize: 0,
    hasAC: false,
    yearbuilt: 0,
    rentprice: 0,
    dateavailable: new Date(),
    comments: [],
    rating: 5
  };

  commentForm: FormGroup;
  comments: string[] = [];
  rating: number = 5;

  constructor(private fb: FormBuilder, private flatService: FlatService) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.comments = this.flatInfo.comments || [];
    this.rating = this.flatInfo.rating || 5;
  }

  addComment() {
    if (this.commentForm.valid) {
      this.comments.push(this.commentForm.value.comment);
      this.commentForm.reset();
    }
  }

  saveDetails() {
    this.flatInfo.comments = this.comments;
    this.flatInfo.rating = this.rating;
    this.flatService.editFlat(this.flatInfo);
  }
}
