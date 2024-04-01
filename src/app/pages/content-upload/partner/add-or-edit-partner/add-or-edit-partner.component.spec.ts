import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditPartnerComponent } from './add-or-edit-partner.component';

describe('AddOrEditPartnerComponent', () => {
  let component: AddOrEditPartnerComponent;
  let fixture: ComponentFixture<AddOrEditPartnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditPartnerComponent]
    });
    fixture = TestBed.createComponent(AddOrEditPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
