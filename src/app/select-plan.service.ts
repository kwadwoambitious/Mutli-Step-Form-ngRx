import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Plans } from './plan-interface';

@Injectable({
  providedIn: 'root',
})
export class SelectPlanService {
  constructor(private http: HttpClient) {}

  public getPlansData(): Observable<Plans[]> {
    return this.http.get<Plans[]>('./plans-data.json').pipe(
      map((plans) =>
        plans.map((plan) => ({
          ...plan,
          type: plan.name.toLowerCase() as 'arcade' | 'advanced' | 'pro',
        }))
      )
    );
  }
}
