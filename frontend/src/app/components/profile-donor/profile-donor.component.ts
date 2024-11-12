import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-donor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-donor.component.html',
  styleUrl: './profile-donor.component.css'
})
export class ProfileDonorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
