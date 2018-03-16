import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { ForestFinderComponent } from './forest-finder.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChristmasTreesService } from '../../_services/christmas-trees.service';
import { RemovePuncPipe } from './remove-punc.pipe';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpacesToDashesPipe } from '../../../_pipes/spaces-to-dashes.pipe';
import { UtilService } from '../../../_services/util.service';
import { HttpClientModule } from '@angular/common/http';

describe('ForestFinderComponent', () => {
  let component: ForestFinderComponent;
  let fixture: ComponentFixture<ForestFinderComponent>;
  let router: Router;
  let location: Location;

  const mockActivatedRoute = {
    params: Observable.of({ id: 1 }),
    data: Observable.of({
      forests: [
        {
          id: 1,
          forestName: 'Arapaho and Roosevelt',
          description: 'Arapaho & Roosevelt | Colorado | Fort Collins, CO',
          forestAbbr: 'arp'
        },
        { id: 2, forestName: 'Flathead', description: 'Flathead | Montana | Kalispell, MT', forestAbbr: 'flathead' },
        { id: 3, forestName: 'Mt. Hood', description: 'Mt. Hood | Oregon | Portland, OR', forestAbbr: 'mthood' },
        {
          id: 4,
          forestName: 'Shoshone',
          description: 'Shoshone | Montana, Wyoming | Cody, WY, Jackson, WY',
          forestAbbr: 'shoshone'
        }
      ]
    })
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ForestFinderComponent, RemovePuncPipe, SpacesToDashesPipe],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [UtilService, { provide: ChristmasTreesService, useClass: ChristmasTreesService }],
        imports: [
          HttpClientModule,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([
            {
              path: 'christmas-trees/forests/:id',
              component: ForestFinderComponent
            }
          ])
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ForestFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should redirect to forest page on click',
    fakeAsync(() => {
      component.goToForest('arp');
      tick();
      expect(location.path()).toBe('/christmas-trees/forests/arp');
    })
  );
});
