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
    readonly addOnsService: AddOnsService,
    readonly selectPlanService: SelectPlanService
  ) {}

  ngOnInit(): void {
    this.addOnsService.getAddOnsData().subscribe((data) => {
      this.addOnsContainer = data.add_ons;

      const storedAddOns = localStorage.getItem('add-ons');
      if (storedAddOns) {
        this.selectedAddOns = JSON.parse(storedAddOns);

        this.addOnsContainer.forEach((add_on) => {
          const storedAddOn = this.selectedAddOns.find(
            (selected) => selected.name === add_on.name
          );
          if (storedAddOn) {
            add_on.selected = storedAddOn.selected;
          } else {
            add_on.selected = false;
          }
        });
      }
    });
    this.isToggled = this.selectPlanService.getPlanDuration();
  }

  public getChecked(add_on: AddOns): void {
    add_on.selected = !add_on.selected;

    if (add_on.selected) {
      this.selectedAddOns.push(add_on);
    } else {
      this.selectedAddOns = this.selectedAddOns.filter(
        (existingAddOn) => existingAddOn.name !== add_on.name
      );
    }

    localStorage.setItem('add-ons', JSON.stringify(this.selectedAddOns));
  }
}
