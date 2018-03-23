import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChristmasTreeMapDetailsComponent } from './christmas-tree-map-details.component';
import { ChristmasTreeMapDetailsService } from './christmas-tree-map-details.service';

describe('ChristmasTreeMapDetailsComponent', () => {
  let component: ChristmasTreeMapDetailsComponent;
  let fixture: ComponentFixture<ChristmasTreeMapDetailsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ChristmasTreeMapDetailsComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ChristmasTreeMapDetailsService, useClass: ChristmasTreeMapDetailsService }
        ],
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
});
