import { Injectable } from '@angular/core';
import { ResponseOptions, Response } from '@angular/http';

@Injectable()
export class MockService {
  mockResponse(mockBackend, mockResponse) {
    return mockBackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })
        )
      );
    });
  }
}
