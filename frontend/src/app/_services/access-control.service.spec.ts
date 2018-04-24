import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessControlService } from './access-control.service';
import { UtilService } from './util.service';

describe('AccessControlService', () => {
  let service: AccessControlService;
  let util: UtilService;

  beforeEach(() => {
    service = new AccessControlService(null, null, null);
    service.redirect = () => {
      return false;
    };
    service.navigate = () => {
      return true;
    };
    TestBed.configureTestingModule({
      providers: [AccessControlService, UtilService],
      imports: [RouterTestingModule]
    });
    util = new UtilService();
  });

  it('should allow an admin user to access an admin route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'admin' },
      { routeConfig: { path: 'admin/applications' } }
    );
    expect(valid).toBeTruthy();
  });

  it('should not allow a normal user to access an admin route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'user' },
      { data: { admin: true }, routeConfig: { path: 'admin/applications' } }
    );
    expect(valid).toBeFalsy();
  });

  it('should allow an admin user to access a normal restricted route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'admin' },
      { routeConfig: { path: 'applications/temp-outfitters/new' } }
    );
    expect(valid).toBeTruthy();
  });

  it('should allow a normal user to access a normal restricted route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'user' },
      { routeConfig: { path: 'applications/temp-outfitters/new' } }
    );
    expect(valid).toBeTruthy();
  });

  it('should not allow a non-authenticated user to access a normal restricted route', () => {
    service.util = new UtilService();
    const valid = service.validateUser(null, { routeConfig: { path: 'applications/temp-outfitters/new' } });
    expect(valid).toBeFalsy();
  });
});
