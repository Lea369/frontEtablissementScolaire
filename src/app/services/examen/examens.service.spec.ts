import { TestBed } from '@angular/core/testing';

import { ExamensService } from './examens.service';

describe('ExamenService', () => {
  let service: ExamensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
