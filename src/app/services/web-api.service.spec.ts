import { TestBed, inject } from '@angular/core/testing';

import { WebAPI } from '../services/web-api.service';

describe('WebAPI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebAPI]
    });
  });

  it('should be created', inject([WebAPI], (service: WebAPI) => {
    expect(service).toBeTruthy();
  }));
});
