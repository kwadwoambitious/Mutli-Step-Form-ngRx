import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddOnsService } from '../add-ons.service';
import { SelectPlanService } from '../select-plan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddOns } from '../add-ons-interface';

@Component({
  selector: 'app-add-ons',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.css'],
})
export class AddOnsComponent {
  public isToggled = true;
  public addOnsContainer: AddOns[] = [];
  public selectedAddOns: AddOns[] = [];

  constructor(
    private addOnsService: AddOnsService,
    private selectPlanService: SelectPlanService
  ) {}

  ngOnInit(): void {
    this.initSelectedAddOns();
    this.isToggled = this.selectPlanService.getPlanDuration();
  }

  private initSelectedAddOns(): void {
    this.addOnsService.getAddOnsData().subscribe((data) => {
      this.addOnsContainer = data;

      const storedAddOns = localStorage.getItem('addOns');
      if (storedAddOns) {
        this.selectedAddOns = JSON.parse(storedAddOns);

        this.addOnsContainer.forEach((addOn) => {
          const storedAddOn = this.selectedAddOns.find(
            (selected) => selected.name === addOn.name
          );
          if (storedAddOn) {
            addOn.selected = storedAddOn.selected;
          } else {
            addOn.selected = false;
          }
        });
      }
    });
  }

  public getChecked(addOn: AddOns): void {
    addOn.selected = !addOn.selected;

    if (addOn.selected) {
      this.selectedAddOns.push(addOn);
    } else {
      this.selectedAddOns = this.selectedAddOns.filter(
        (existingAddOn) => existingAddOn.name !== addOn.name
      );
    }

    localStorage.setItem('addOns', JSON.stringify(this.selectedAddOns));
  }
}
