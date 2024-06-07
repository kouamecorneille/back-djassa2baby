import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInfosComponent } from './store-infos.component';

describe('StoreInfosComponent', () => {
  let component: StoreInfosComponent;
  let fixture: ComponentFixture<StoreInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
