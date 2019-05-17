import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AccessControlService } from './access-control.service';
import { UtilService } from './util.service';

describe('AccessControlService', () => {
  let service: AccessControlService;
  let utilSpy: jasmine.SpyObj<UtilService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UtilService', ['navigateExternal', 'setLoginRedirectMessage']);

    TestBed.configureTestingModule({
      providers: [AccessControlService,
        { provide: UtilService, useValue: spy },
        { provide: AuthenticationService }
      ]
    });
    service = TestBed.get(AccessControlService);
    utilSpy = TestBed.get(UtilService);
  });

  it('should not allow an admin user to access an admin route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'admin' }
    );
    expect(valid).toBeFalsy();
    expect(utilSpy.setLoginRedirectMessage).toHaveBeenCalled();
  });

  it('should allow a user to access a normal restricted route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'user' }
    );
    expect(valid).toBeTruthy();
    expect(utilSpy.setLoginRedirectMessage).not.toHaveBeenCalled();
  });
});
