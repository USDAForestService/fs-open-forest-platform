import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

interface Data {
  name: string;
}

const httpUrl = '/data';

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  /// Tests begin ///
  it('can test HttpClient.get', () => {
    const httpTest: Data = {name: 'Test Data'};

    // Make an HTTP GET request
    httpClient.get<Data>(httpUrl)
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(httpTest)
      );

    const req = httpTestingController.expectOne('/data');

    expect(req.request.method).toEqual('GET');
    req.flush(httpTest);
    httpTestingController.verify();
  });

  it('can test HttpClient.get with matching header', () => {
    const httpTest: Data = {name: 'Test Data'};
    httpClient.get<Data>(httpUrl, {
        headers: new HttpHeaders({'Authorization': 'my-auth-token'})
      })
      .subscribe(data =>
        expect(data).toEqual(httpTest)
      );

    const req = httpTestingController.expectOne(
      s => s.headers.has('Authorization')
    );
    req.flush(httpTest);
  });

  it('can test for multiple asyn requests', () => {
    const httpTest: Data[] = [
      { name: 'bob' }, { name: 'carol' },
      { name: 'ted' }, { name: 'alice' }
    ];

    // Make three requests in a row
    httpClient.get<Data[]>(httpUrl)
      .subscribe(d => expect(d.length).toEqual(0, 'should have no data'));

    httpClient.get<Data[]>(httpUrl)
      .subscribe(d => expect(d).toEqual([httpTest[0]], 'should be one element array'));

    httpClient.get<Data[]>(httpUrl)
      .subscribe(d => expect(d).toEqual(httpTest, 'should be expected data'));


    const requests = httpTestingController.match(httpUrl);
    expect(requests.length).toEqual(3);
    requests[0].flush([]);
    requests[1].flush([httpTest[0]]);
    requests[2].flush(httpTest);
  });

  it('can test for 404 error', () => {
    const emsg = 'test 404 error';

    httpClient.get<Data[]>(httpUrl).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(httpUrl);

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('can test for network error', () => {
    const emsg = 'network error';

    httpClient.get<Data[]>(httpUrl).subscribe(
      data => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(httpUrl);


    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });

    // Respond with mock error
    req.error(mockError);
  });

  it('httpTestingController.verify should fail if HTTP response not simulated', () => {

    httpClient.get('test/api').subscribe();

    expect(() => httpTestingController.verify()).toThrow();
    const req = httpTestingController.expectOne('test/api');
    req.flush(null);
  });

});
