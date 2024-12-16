import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddOns } from './add-ons-interface';

@Injectable({
  providedIn: 'root',
})
export class AddOnsService {
  constructor(readonly http: HttpClient) {}

  public getAddOnsData(): Observable<{ add_ons: AddOns[] }> {
    return this.http.get<{ add_ons: AddOns[] }>('./add-ons-data.json');
  }
}
