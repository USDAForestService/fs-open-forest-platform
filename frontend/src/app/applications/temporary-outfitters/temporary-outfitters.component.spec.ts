import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryOutfittersComponent } from './temporary-outfitters.component';

describe('TemporaryOutfittersComponent', () => {
  let component: TemporaryOutfittersComponent;
  let fixture: ComponentFixture<TemporaryOutfittersComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TemporaryOutfittersComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryOutfittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
