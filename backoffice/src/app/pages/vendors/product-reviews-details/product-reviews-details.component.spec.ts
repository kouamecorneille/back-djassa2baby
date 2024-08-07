import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewsDetailsComponent } from './product-reviews-details.component';

describe('ProductReviewsDetailsComponent', () => {
  let component: ProductReviewsDetailsComponent;
  let fixture: ComponentFixture<ProductReviewsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductReviewsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductReviewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
