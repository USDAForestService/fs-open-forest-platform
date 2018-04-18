import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackScrollDirective } from './scroll.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div id="test" appTrackScroll>a div</div>`
})
class TestTrackScrollDirectiveComponent {
}

describe('Directive: TrackScrollDirective', () => {
  let component: TestTrackScrollDirectiveComponent;
  let fixture: ComponentFixture<TestTrackScrollDirectiveComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackScrollDirective, TestTrackScrollDirectiveComponent]
    });

    fixture = TestBed.createComponent(TestTrackScrollDirectiveComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('#test'));
  });

  it('should instantiate', () => {
    inputEl.triggerEventHandler('scroll', null);
    fixture.detectChanges();
    expect(inputEl).toBeTruthy();
  });

});
