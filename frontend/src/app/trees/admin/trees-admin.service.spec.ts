import { TestBed } from '@angular/core/testing';
import { TreesAdminService } from './trees-admin.service';
import { FormBuilder} from '@angular/forms';

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
