import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForestFinderComponent } from './forest-finder.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ForestFinderComponent', () => {
  let component: ForestFinderComponent;
  let fixture: ComponentFixture<ForestFinderComponent>;


  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ForestFinderComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [],
        imports: [
          HttpClientModule,
          HttpClientTestingModule,
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show trees has moved', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Christmas Trees has moved')
  })
});
