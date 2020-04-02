import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestTemplateComponent } from './forest-template.component';

describe('ForestTemplateComponent', () => {
  let component: ForestTemplateComponent;
  let fixture: ComponentFixture<ForestTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForestTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
