import {TestBed, inject} from '@angular/core/testing';
import {GoogleAnalyticsService} from './google-analytics.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('GoogleAnalyticsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GoogleAnalyticsService],
            imports: [RouterTestingModule]
        });
    });

    it('should be created', inject([GoogleAnalyticsService], (service: GoogleAnalyticsService) => {
        expect (service).toBeTruthy();
    }));
});
