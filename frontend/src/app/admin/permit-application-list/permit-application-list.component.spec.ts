import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitApplicationListComponent } from './permit-application-list.component';
import { FormsModule } from '@angular/forms';

describe('PermitApplicationListComponent', () => {
  let component: PermitApplicationListComponent;
  let fixture: ComponentFixture<PermitApplicationListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PermitApplicationListComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
