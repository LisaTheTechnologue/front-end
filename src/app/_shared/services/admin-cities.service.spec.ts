/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminCitiesService } from './admin-cities.service';

describe('Service: AdminCities', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminCitiesService]
    });
  });

  it('should ...', inject([AdminCitiesService], (service: AdminCitiesService) => {
    expect(service).toBeTruthy();
  }));
});
