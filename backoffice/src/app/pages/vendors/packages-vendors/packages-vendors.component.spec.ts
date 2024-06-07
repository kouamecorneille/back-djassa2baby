import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesVendorsComponent } from './packages-vendors.component';

describe('PackagesVendorsComponent', () => {
  let component: PackagesVendorsComponent;
  let fixture: ComponentFixture<PackagesVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesVendorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagesVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
