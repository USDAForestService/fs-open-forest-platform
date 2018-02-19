import { TestBed, async, inject } from '@angular/core/testing';
import { ForestService } from './forest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Rx';
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

  it(
    'should get JSON',
    inject([ForestService], service => {
      expect(service.getJSON('arp')).toEqual(jasmine.any(Observable));
    })
  );

  it(
    'should get text',
    inject([ForestService], service => {
      expect(service.getText('/assets/content/apr/contact-information/contact-us.md')).toEqual(jasmine.any(Observable));
    })
  );

  it(
    'should call get forest with content',
    inject([ForestService], service => {
      const spy = sinon.spy(service, 'getForestWithContent');
      service.getForestWithContent(1);
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'return named markdown array',
    inject([ForestService], service => {
      const content = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9'];
      const namedContent = {
        contactUs: 'test1',
        beforeYouCut: 'test2',
        whenYouCut: 'test3',
        cuttingYourTree: 'test4',
        prohibitedRules: 'test5',
        sesonDatesAdditionalInformation: 'test6',
        treeLocationsAllowed: 'test7',
        treeLocationsProhibited: 'test8',
        howToPlanYourTrip: 'test9'
      };
      expect(service.nameMdArray(content, 'arp')).toEqual(namedContent);
    })
  );


});
