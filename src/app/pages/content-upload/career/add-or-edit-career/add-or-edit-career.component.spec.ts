import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCareerComponent } from './add-or-edit-career.component';

describe('AddOrEditCareerComponent', () => {
  let component: AddOrEditCareerComponent;
  let fixture: ComponentFixture<AddOrEditCareerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditCareerComponent]
    });
    fixture = TestBed.createComponent(AddOrEditCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
