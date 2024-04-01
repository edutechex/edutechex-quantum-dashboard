import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditServicesComponent } from './add-or-edit-services.component';

describe('AddOrEditServicesComponent', () => {
  let component: AddOrEditServicesComponent;
  let fixture: ComponentFixture<AddOrEditServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditServicesComponent]
    });
    fixture = TestBed.createComponent(AddOrEditServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
