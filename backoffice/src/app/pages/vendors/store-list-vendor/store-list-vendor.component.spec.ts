import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListVendorComponent } from './store-list-vendor.component';

describe('StoreListVendorComponent', () => {
  let component: StoreListVendorComponent;
  let fixture: ComponentFixture<StoreListVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreListVendorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreListVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
