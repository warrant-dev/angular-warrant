import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantProtectedComponent } from './warrant-protected.component';

describe('WarrantProtectedComponent', () => {
  let component: WarrantProtectedComponent;
  let fixture: ComponentFixture<WarrantProtectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantProtectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarrantProtectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
