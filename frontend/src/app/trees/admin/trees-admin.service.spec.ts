import { TestBed, async, inject } from '@angular/core/testing';
import { TreesAdminService } from './trees-admin.service';
import { forest } from '../_mocks/forest.mock';
import { FormBuilder, Validators } from '@angular/forms';

describe('TreesAdminService', () => {
  let service: TreesAdminService;

  beforeEach(() => {
    service = new TreesAdminService();

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: TreesAdminService }
      ]
    });
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });


});
