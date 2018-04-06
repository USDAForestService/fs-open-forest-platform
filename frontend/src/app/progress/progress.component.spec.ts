import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProgressComponent } from './progress.component';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ProgressComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.debugElement.componentInstance;
    component.numberOfFiles = 2;
    component.fileUploadProgress = 1;
    component.fileUploadError = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event', () => {
    component.retry();
    expect(component.retryFileUpload).toEqual(new EventEmitter<any>());
  });
});
