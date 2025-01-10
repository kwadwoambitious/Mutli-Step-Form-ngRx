import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectPlanService } from '../select-plan.service';
import { RouterLink } from '@angular/router';
import { Plans } from '../plan-interface';

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css'],
})
export class SelectPlanComponent implements OnInit {
  public selectPlanContainer: Plans[] = [];
  public isToggled = false;
  public selectedPlan: Plans | undefined = undefined;

  constructor(private selectPlanService: SelectPlanService) {}

  ngOnInit(): void {
    this.initSelectedPlan();
    const storedPlan = localStorage.getItem('selectedPlan');
    this.selectedPlan = storedPlan ? JSON.parse(storedPlan) : undefined;

    const storedValue = localStorage.getItem('selectedDuration');
    this.isToggled = storedValue ? JSON.parse(storedValue) : false;
  }

  private initSelectedPlan(): void {
    this.selectPlanService.getPlansData().subscribe((data) => {
      this.selectPlanContainer = data;
    });
  }

  public selectPlan(plan: Plans): void {
    this.selectedPlan = plan;
    this.saveChanges();
  }

  public toggleDuration(): void {
    this.isToggled = !this.isToggled;
    this.saveChanges();
  }

  public saveChanges(): void {
    localStorage.setItem('selectedPlan', JSON.stringify(this.selectedPlan));
    localStorage.setItem('selectedDuration', String(this.isToggled));
  }
}
