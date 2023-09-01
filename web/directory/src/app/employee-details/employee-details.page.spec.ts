import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsPage } from './employee-details.page';

describe('EmployeeDetailsPage', () => {
  let component: EmployeeDetailsPage;
  let fixture: ComponentFixture<EmployeeDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmployeeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
