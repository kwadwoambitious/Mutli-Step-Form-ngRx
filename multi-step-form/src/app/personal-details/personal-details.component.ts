import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
})
export class PersonalDetailsComponent implements OnInit {
  personalInfoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
  });

  public isSubmitted = false;

  constructor(readonly router: Router) {}

  ngOnInit(): void {
    const savedName = localStorage.getItem('name');
    const savedEmail = localStorage.getItem('email');
    const savedPhone = localStorage.getItem('phone');

    this.personalInfoForm.patchValue({
      name: savedName,
      email: savedEmail,
      phone: savedPhone,
    });
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    localStorage.setItem('name', this.personalInfoForm.value.name ?? '');
    localStorage.setItem('email', this.personalInfoForm.value.email ?? '');
    localStorage.setItem('phone', this.personalInfoForm.value.phone ?? '');

    if (this.personalInfoForm.valid) {
      this.router.navigate(['/select-plan']);
    }
  }
}
