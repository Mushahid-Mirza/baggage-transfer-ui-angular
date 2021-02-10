import { TestBed } from '@angular/core/testing';

import { AzureApiServicesService } from './azure-api-services.service';

describe('AzureApiServicesService', () => {
  let service: AzureApiServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureApiServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
