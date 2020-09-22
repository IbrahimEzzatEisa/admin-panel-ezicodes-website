import { TestBed } from '@angular/core/testing';

import { AbleSchemaService } from './able-schema.service';

describe('AbleSchemaService', () => {
  let service: AbleSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbleSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
