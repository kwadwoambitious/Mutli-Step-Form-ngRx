import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plans } from './plan-interface';

@Injectable({
  providedIn: 'root',
})
export class SelectPlanService {
  constructor(private http: HttpClient) {}

  public getPlansData(): Observable<Plans[]> {
    return this.http.get<Plans[]>('./plans-data.json');
  }

  public getPlanDuration(): boolean {
    const storedValue = localStorage.getItem('selectedDuration');
    return storedValue ? JSON.parse(storedValue) : false;
  }
}
