import { DashesToSpacesAndCapitalizePipe } from './dashes-to-spaces-and-capitalize.pipe';

describe('SpacesToDashesPipe', () => {
  let pipe: DashesToSpacesAndCapitalizePipe;

  beforeEach(() => {
    pipe = new DashesToSpacesAndCapitalizePipe();
  });

  it('transforms dashes to spaces and capitalize', () => {
    const value: any = 'test-value';
    expect(pipe.transform(value)).toEqual('Test value');
  });
});
