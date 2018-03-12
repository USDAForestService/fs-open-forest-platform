import { AdminUserFormatterPipe } from './admin-user-formatter.pipe';

describe('AdminUserFormatterPipe', () => {
  let pipe: AdminUserFormatterPipe;

  beforeEach(() => {
    pipe = new AdminUserFormatterPipe();
  });

  it('formats a user name', () => {
    expect(pipe.transform('TEST_USER')).toEqual('Test User');
    expect(pipe.transform('TEST_USER-USER_TEST')).toEqual('Test User-User Test');
    expect(pipe.transform('test@test.com')).toEqual('test@test.com');
  });
});
