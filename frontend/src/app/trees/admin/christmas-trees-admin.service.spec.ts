import { TestBed } from '@angular/core/testing';
import { ChristmasTreesAdminService } from './christmas-trees-admin.service';
import { FormBuilder } from '@angular/forms';

describe('ChristmasTreesAdminService', () => {
  let service: ChristmasTreesAdminService;

  beforeEach(() => {
    service = new ChristmasTreesAdminService();

    TestBed.configureTestingModule({
      providers: [FormBuilder, { provide: ChristmasTreesAdminService }]
    });
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

});
