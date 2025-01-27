import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as FormActions from '../store/actions/form.actions';
import * as FormSelectors from '../store/selectors/form.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-details-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
  personalInfoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
  });

  public isSubmitted = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(FormSelectors.selectPersonalInfo)
      .pipe(takeUntil(this.destroy$))
      .subscribe((personalInfo) => {
        if (personalInfo) {
          this.personalInfoForm.patchValue({
            name: personalInfo.name,
            email: personalInfo.email,
            phone: personalInfo.phoneNumber,
          });
        }
      });
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    if (this.personalInfoForm.valid) {
      this.store.dispatch(
        FormActions.updatePersonalInfo({
          name: this.personalInfoForm.value.name ?? '',
          email: this.personalInfoForm.value.email ?? '',
          phoneNumber: this.personalInfoForm.value.phone ?? '',
        })
      );

      this.store.dispatch(FormActions.nextStep());
      this.router.navigate(['/select-plan']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
