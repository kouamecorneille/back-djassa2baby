import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcersioncheckerComponent } from './newcersionchecker.component';

describe('NewcersioncheckerComponent', () => {
  let component: NewcersioncheckerComponent;
  let fixture: ComponentFixture<NewcersioncheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcersioncheckerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewcersioncheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
