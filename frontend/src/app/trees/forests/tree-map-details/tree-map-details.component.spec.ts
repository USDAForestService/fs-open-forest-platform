import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TreeMapDetailsComponent } from './tree-map-details.component';
import { MapDetailsService } from './map-detials.service';

describe('TreeMapDetailsComponent', () => {
  let component: TreeMapDetailsComponent;
  let fixture: ComponentFixture<TreeMapDetailsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TreeMapDetailsComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: MapDetailsService, useClass: MapDetailsService }
        ],
        imports: [HttpClientTestingModule, RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeMapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
