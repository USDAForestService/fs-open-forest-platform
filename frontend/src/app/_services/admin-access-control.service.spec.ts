import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AdminAccessControlService } from './admin-access-control.service';
import { UtilService } from './util.service';

describe('AdminAccessControlService', () => {
  let service: AdminAccessControlService;
  let utilSpy: jasmine.SpyObj<UtilService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UtilService', ['navigateExternal', 'setLoginRedirectMessage']);

    TestBed.configureTestingModule({
      providers: [AdminAccessControlService,
        { provide: UtilService, useValue: spy },
        { provide: AuthenticationService }
      ]
    });
    service = TestBed.get(AdminAccessControlService);
    utilSpy = TestBed.get(UtilService);
  });

  it('should allow an admin user to access an admin route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'admin' }
    );
    expect(valid).toBeTruthy();
    expect(utilSpy.setLoginRedirectMessage).not.toHaveBeenCalled();
  });

  it('should not allow a normal user to access an admin route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'user' }
    );
    expect(valid).toBeFalsy();
    expect(utilSpy.setLoginRedirectMessage).toHaveBeenCalled();
  });
});
