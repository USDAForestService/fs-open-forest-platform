import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChristmasTreeProgressBarComponent } from './christmas-tree-progress-bar.component';

describe('ChristmasTreeProgressBarComponent', () => {
  let component: ChristmasTreeProgressBarComponent;
  let fixture: ComponentFixture<ChristmasTreeProgressBarComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ChristmasTreeProgressBarComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChristmasTreeProgressBarComponent);
    component = fixture.componentInstance;
    component.step = 'payment';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
