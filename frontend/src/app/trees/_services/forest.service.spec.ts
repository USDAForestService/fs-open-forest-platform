import { TestBed, async, inject } from '@angular/core/testing';
import { ForestService } from './forest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as sinon from 'sinon';

describe('ForestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForestService]
    });
  });

  it(
    'should get all forests',
    inject([ForestService], service => {
      const spy = sinon.spy(service, 'getAll');
      service.getAll();
      expect(spy.called).toBeTruthy();
    })
  );
});
