import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { SectionHeadingComponent } from './section-heading.component';
import { UtilService } from '../_services/util.service';

describe('SectionHeadingComponent', () => {
  let component: SectionHeadingComponent;
  let fixture: ComponentFixture<SectionHeadingComponent>;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SectionHeadingComponent],
        providers: [{ provide: UtilService, useClass: UtilService }, { provide: Renderer2, useClass: Renderer2 }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionHeadingComponent);
    component = fixture.debugElement.componentInstance;
    component.heading = 'testHeading';
    component.elementId = 'testId';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
