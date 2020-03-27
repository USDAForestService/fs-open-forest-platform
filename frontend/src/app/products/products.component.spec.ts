import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChristmasTreesInfoService } from '../trees/_services/christmas-trees-info.service';
import { ProductsComponent } from './products.component';
import { UtilService } from '../../../_services/util.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [UtilService, { provide: ChristmasTreesInfoService, useClass: ChristmasTreesInfoService }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
