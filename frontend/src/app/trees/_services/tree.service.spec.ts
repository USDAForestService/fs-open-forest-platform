import { TestBed, async, inject } from '@angular/core/testing';
import { TreesService } from './trees.service';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import * as sinon from 'sinon';

describe('TreesService', () => {
  let service: TreesService;

  beforeEach(() => {
    service = new TreesService(null, null);

    TestBed.configureTestingModule({
      providers: [{ provide: TreesService }]
    });
  });
  it('should go to hashtag', () => {
    const dummyElement = {
      id: 'fragment',
      scrollIntoView: sinon.stub(),
      focus: sinon.stub()
    };

    service.gotoHashtag('fragment', new Event('click'));

    const stub = sinon.stub(document, 'querySelector');

    const elementByIdStub = sinon.stub(document, 'getElementById');

    expect(dummyElement.focus.called).toBeFalsy();

    stub.withArgs('#fragment').returns(dummyElement);

    elementByIdStub.withArgs('fragment').returns(dummyElement);

    service.gotoHashtag('fragment', new Event('click'));

    expect(stub.called).toBeTruthy();
    expect(elementByIdStub.called).toBeTruthy();
    stub.restore();
    elementByIdStub.restore();
  });
});
