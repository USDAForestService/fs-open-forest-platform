import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChristmasTreeMapDetailsComponent } from './christmas-tree-map-details.component';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

describe('ChristmasTreeMapDetailsComponent', () => {
  let component: ChristmasTreeMapDetailsComponent;
  let fixture: ComponentFixture<ChristmasTreeMapDetailsComponent>;

  beforeEach(
    async(() => {
      const mockSeasonNotOpenRoute = {
        params: Observable.of({ id: 'id', mapId: 'mapId' }),
        data: Observable.of({
          forest: {
            forestName: 'forest name'
          }
        })
      };

      TestBed.configureTestingModule({
        declarations: [ChristmasTreeMapDetailsComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ActivatedRoute, useValue: mockSeasonNotOpenRoute },
          { provide: Title, useClass: Title }],
        imports: [HttpClientTestingModule, RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChristmasTreeMapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title using forest and map id', () => {
    const titleService = TestBed.get(Title);
    expect(titleService.getTitle()).toBe('Map details for forest name mapId cutting area or ranger district | U.S. Forest Service Christmas Tree Permitting');
  });
});
