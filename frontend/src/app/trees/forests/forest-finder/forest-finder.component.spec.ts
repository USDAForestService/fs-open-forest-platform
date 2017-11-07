import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Ng2AutoCompleteModule} from 'ng2-auto-complete';
import { ForestFinderComponent } from './forest-finder.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { ForestService } from '../../_services/forest.service';
import { RemovePuncPipe } from './remove-punc.pipe';
import {HttpModule, XHRBackend, ResponseOptions, Response} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ScalarObservable} from 'rxjs/observable/ScalarObservable';

fdescribe('ForestFinderComponent', () => {
  let component: ForestFinderComponent;
  let fixture: ComponentFixture<ForestFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForestFinderComponent, RemovePuncPipe],
      imports: [ HttpModule, Ng2AutoCompleteModule, RouterTestingModule ],
      providers: [{ provide: ForestService, useClass: ForestService }, { provide: XHRBackend, useClass: MockBackend }],
      schemas: [ NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter the forests for the typeahead', () => {
   expect(component.forestSearchResults('hood') instanceof ScalarObservable);
  });

  it('should filter the forests for the typeahead', () => {
    expect(component.forestListFormatter(component.results[0])).toEqual('Shoshone | Montana, Wyoming | Cody, WY, Jackson, WY');
  });

  it(
    'should get forest object',
    inject([ForestService, XHRBackend], (service, mockBackend) => {
      const mockResponse = [
        {
          'id': 1,
          'forestName': 'Forest National Forest'
        }
      ];
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service.getAll().subscribe(result => {
        expect(result[0].forestName).toBe('Forest National Forest');
      });
    })
  );

});
