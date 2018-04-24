import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleDirective } from './title.directive';
import { Component, DebugElement } from '@angular/core';
import { By, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: `<div id="test" appPageTitle>some stuff</div>`
})
class TestTitleDirectiveComponent {
}

describe('Directive: Title', () => {
  let component: TestTitleDirectiveComponent;
  let fixture: ComponentFixture<TestTitleDirectiveComponent>;
  let inputEl: DebugElement;
  let router: Router;
  let titleService: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: TestTitleDirectiveComponent, data: {title: 'test'} }
      ])],
      declarations: [TitleDirective, TestTitleDirectiveComponent],
      providers: [Title]
    });

    fixture = TestBed.createComponent(TestTitleDirectiveComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set the title from the route', () => {
    inputEl = fixture.debugElement.query(By.css('#test'));
    fixture.detectChanges();
    expect(inputEl).toBeTruthy();
    titleService = TestBed.get(Title);
    expect(titleService.getTitle()).toBe('test');
  });
});
