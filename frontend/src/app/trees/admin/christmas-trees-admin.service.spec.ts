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

  it('should return admin nav items', () => {
    expect(service.getAdminNavItems().length).toEqual(5);
    expect(service.getAdminNavItems()[0].title).toEqual('Christmas tree permits');
  });
});
