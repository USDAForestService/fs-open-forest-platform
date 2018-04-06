import { inject, TestBed } from '@angular/core/testing';
import { ChristmasTreesInfoService } from './christmas-trees-info.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Rx';
import * as sinon from 'sinon';

describe('ChristmasTreesInfoService', () => {
  let httpMock: HttpTestingController;

  const forest = {
    id: 1,
    forestName: 'Arapaho and Roosevelt National Forests',
    description: 'Arapaho & Roosevelt | Colorado | Fort Collins, CO',
    forestAbbr: 'arp',
    startDate: '10/30/2018',
    endDate: '9/30/2019',
    cuttingAreas: {
      ELKCREEK: { startDate: '2017-12-02 15:30:00Z', endDate: '2017-12-09 21:30:00Z', name: 'Elk Creek' },
      REDFEATHERLAKES: { startDate: '2017-12-02 15:30:00Z', endDate: '2017-12-10 21:30:00Z', name: 'Red Feather Lakes' },
      SULPHUR: { startDate: '2017-11-01 12:00:00Z', endDate: '2018-01-06 21:30:00Z', name: 'Sulphur' },
      CANYONLAKES: { startDate: '2017-11-27 15:30:00Z', endDate: '2017-12-10 21:30:00Z', name: 'Canyon Lakes' }
    },
    timezone: 'America/Denver'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChristmasTreesInfoService]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it(
    'should get all forests',
    inject([ChristmasTreesInfoService], service => {
      const spy = sinon.spy(service, 'getAll');
      service.getAll();
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'should get JSON',
    inject([ChristmasTreesInfoService], service => {
      expect(service.getJSON('arp')).toEqual(jasmine.any(Observable));
    })
  );

  it(
    'should get text',
    inject([ChristmasTreesInfoService], service => {
      expect(service.getText('/assets/content/apr/contact-information/contact-us.md')).toEqual(jasmine.any(Observable));
    })
  );

  it(
    'should call get forest with content',
    inject([ChristmasTreesInfoService], service => {
      const forestJSON = {
        name: 'arp',
        treeSpecies: [
          {
            id: 'engelmann-spruce',
            name: 'Engelmann Spruce',
            status: 'recommended'
          },
          {
            id: 'douglas-fir',
            name: 'Douglas-fir',
            status: 'recommended'
          },
          {
            id: 'subalpine-fir',
            name: 'Subalpine Fir',
            status: 'recommended'
          },
          {
            id: 'ponderosa-pine',
            name: 'Ponderosa Pine',
            status: 'not recommended'
          },
          {
            id: 'lodgepole-pine',
            name: 'Lodgepole Pine',
            status: 'not recommended'
          }
        ]
      };

      service.getForestWithContent('arp').subscribe(res => {
        expect(res.forestAbbr).toEqual('arp');
        expect(res.cuttingAreas).toEqual(forest.cuttingAreas);
        expect(res.content.contactUs).toEqual('blah');
        expect(Object.keys(res.content).length).toEqual(10);
      });

      const forestRequest = httpMock.expectOne('http://localhost:8080/forests/arp');
      forestRequest.flush(forest);

      const mdRequestUrls = [
        '/assets/content/arp/introduction.md',
        '/assets/content/arp/contact-information/contact-us.md',
        '/assets/content/arp/cutting-instructions/measuring.md',
        '/assets/content/arp/cutting-instructions/helpful-information.md',
        '/assets/content/arp/season-dates/additional-information.md',
        '/assets/content/arp/tree-locations/allowed.md',
        '/assets/content/arp/tree-locations/prohibited.md',
        '/assets/content/arp/trip-planning/how-to-plan-your-trip.md',
        '/assets/content/arp/rules-to-know/rules.md',
        '/assets/content/common/permit-rules.md'
      ];

      const mdRequests = [];
      mdRequestUrls.forEach(mdRequestUrl => mdRequests.push(httpMock.expectOne(mdRequestUrl)));
      mdRequests.forEach(request => request.flush('blah'));

      const jsonRequest = httpMock.expectOne('assets/config/christmasTreesForests-arp.json');
      jsonRequest.flush(forestJSON);

      httpMock.verify();
    })
  );

  it(
    'return named markdown array',
    inject([ChristmasTreesInfoService], service => {
      const content = [
        'test0',
        'test1',
        'test2',
        'test3',
        'test6',
        'test7',
        'test8',
        'test9',
        'test10',
        'test11'
      ];
      const namedContent = {
        introduction: 'test0',
        contactUs: 'test1',
        beforeYouCut: 'test2',
        whenYouCut: 'test3',
        seasonDatesAdditionalInformation: 'test6',
        treeLocationsAllowed: 'test7',
        treeLocationsProhibited: 'test8',
        howToPlanYourTrip: 'test9',
        rules: 'test10',
        permitRules: 'test11'
      };
      expect(service.nameMdArray(content, 'arp')).toEqual(namedContent);
    })
  );

  it(
    'should return formatted start and end dates',
    inject([ChristmasTreesInfoService], service => {
      expect(service.formatCuttingAreaDate(forest, '2017-12-02 10:00:00Z', '2017-12-12 10:00:00Z')).toEqual(
        'Dec 2 - 12, 2017'
      );

      expect(service.formatCuttingAreaDate(forest, '2017-12-02 01:00:00Z', '2017-12-12 01:00:00Z')).toEqual(
        'Dec 1 - 11, 2017'
      );

      expect(service.formatCuttingAreaDate(forest, '2017-11-02 10:00:00Z', '2017-12-09 10:00:00Z')).toEqual(
        'Nov 2 - Dec 9, 2017'
      );
    })
  );

  it(
    'should return formatted cutting hours',
    inject([ChristmasTreesInfoService], service => {
      expect(service.formatCuttingAreaTime(forest, '2017-11-02 10:00:00Z', '2017-12-09 20:00:00Z')).toEqual(
        '4:00 a.m. - 1:00 p.m.'
      );
    })
  );
});
