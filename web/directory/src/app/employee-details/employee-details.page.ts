import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.page.html',
  styleUrls: ['./employee-details.page.scss'],
})
export class EmployeeDetailsPage implements OnInit {
  public employee!: Employee;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.employee = this.data.getEmployeeById(parseInt(id));
  }
}
