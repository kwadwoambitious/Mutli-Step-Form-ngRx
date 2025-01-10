import { TestBed } from '@angular/core/testing';

import { AddOnsService } from './add-ons.service';

describe('AddOnsService', () => {
  let service: AddOnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
