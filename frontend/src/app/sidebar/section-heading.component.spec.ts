import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, Renderer2, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SectionHeadingComponent } from './section-heading.component';
import { UtilService } from '../_services/util.service';
import { environment } from '../../environments/environment';

describe('SectionHeadingComponent', () => {
  let component: SectionHeadingComponent;
  let fixture: ComponentFixture<SectionHeadingComponent>;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SectionHeadingComponent],
        providers: [
          { provide: UtilService, useClass: MockUtilService },
          { provide: Renderer2, useClass: MockUtilService }
        ],
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

  // it(
  //   'should set current section',
  //   inject([UtilService], util => {
  //     component.elementInView({ value: 'test', target: '.target' });
  //     expect(util.inView).toEqual(true);
  //     component.elementInView({ value: false, target: '.target' });
  //     expect(util.inView).toEqual(false);
  //   })
  // );
});

class MockUtilService {
  currentSection: string;
  inView = false;

  setCurrentSection() {
    this.currentSection = 'test-section';
  }

  getElementsByClassName(className) {
    return ['test'];
  }

  addClass(string) {
    this.inView = true;
  }
  removeClass(string) {
    this.inView = false;
  }
}
