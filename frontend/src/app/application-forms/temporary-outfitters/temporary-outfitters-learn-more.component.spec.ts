import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TemporaryOutfittersLearnMoreComponent } from './temporary-outfitters-learn-more.component';
import { UtilService } from '../../_services/util.service';

describe('TemporaryOutfittersLearnMoreComponent', () => {
  let component: TemporaryOutfittersLearnMoreComponent;
  let fixture: ComponentFixture<TemporaryOutfittersLearnMoreComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TemporaryOutfittersLearnMoreComponent],
        providers: [UtilService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryOutfittersLearnMoreComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
