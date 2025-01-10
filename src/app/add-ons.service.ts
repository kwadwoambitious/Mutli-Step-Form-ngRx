import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddOns } from './add-ons-interface';

@Injectable({
  providedIn: 'root',
})
export class AddOnsService {
  constructor(private http: HttpClient) {}

  public getAddOnsData(): Observable<AddOns[]> {
    return this.http.get<AddOns[]>('./add-ons-data.json');
  }
}
