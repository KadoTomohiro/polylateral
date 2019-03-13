import { TestBed } from '@angular/core/testing';

import { FigureDrawerService } from './figure-drawer.service';

describe('FigureDrawerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FigureDrawerService = TestBed.get(FigureDrawerService);
    expect(service).toBeTruthy();
  });
});
