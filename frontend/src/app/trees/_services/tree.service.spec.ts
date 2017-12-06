import { TestBed, async, inject } from '@angular/core/testing';
import { TreesService } from './trees.service';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import * as sinon from 'sinon';
import { UtilService } from '../../_services/util.service';

describe('TreesService', () => {
  let service: TreesService;

  beforeEach(() => {
    service = new TreesService(null, null, null);

    TestBed.configureTestingModule({
      providers: [UtilService, { provide: TreesService }]
    });
  });
});
