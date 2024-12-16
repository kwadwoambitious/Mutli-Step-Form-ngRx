import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plans } from './plan-interface';

@Injectable({
  providedIn: 'root',
})
export class SelectPlanService {
  constructor(readonly http: HttpClient) {}

  public getPlansData(): Observable<{ plans: Plans[] }> {
    return this.http.get<{ plans: Plans[] }>('./plans-data.json');
  }

  public getPlanDuration(): boolean {
    const storedValue = localStorage.getItem('selectedDuration');
    return storedValue ? JSON.parse(storedValue) : false;
  }
}
