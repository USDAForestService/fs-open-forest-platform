import { TestBed, async, inject } from '@angular/core/testing';
import { TreesService } from './trees.service';
import * as sinon from 'sinon';

describe('TreesService', () => {
  let service: TreesService;

  beforeEach(() => {
    service = new TreesService(null);

    TestBed.configureTestingModule({
      providers: [TreesService]
    });
  });
});
