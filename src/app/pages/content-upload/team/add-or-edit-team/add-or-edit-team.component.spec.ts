import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTeamComponent } from './add-or-edit-team.component';

describe('AddOrEditTeamComponent', () => {
  let component: AddOrEditTeamComponent;
  let fixture: ComponentFixture<AddOrEditTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditTeamComponent]
    });
    fixture = TestBed.createComponent(AddOrEditTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
