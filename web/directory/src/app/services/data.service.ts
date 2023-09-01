import { Injectable } from '@angular/core';
import { data } from '../data/employees';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private employees: Employee[] = data;

  constructor() {}

  public getEmployees(): Employee[] {
    return this.employees;
  }

  public getEmployeeById(id: number): Employee {
    return this.employees[id];
  }
}
