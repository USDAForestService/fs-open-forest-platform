import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgFlowRegPersonFriendFamilyComponent } from './pg-flow-reg-person-friend-family.component';

describe('PgFlowRegPersonFriendFamilyComponent', () => {
  let component: PgFlowRegPersonFriendFamilyComponent;
  let fixture: ComponentFixture<PgFlowRegPersonFriendFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgFlowRegPersonFriendFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgFlowRegPersonFriendFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
