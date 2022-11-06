import { TestBed } from '@angular/core/testing';

import { XlsxExporterService } from './xlsx-exporter.service';

describe('XlsxExporterService', () => {
  let service: XlsxExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XlsxExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
