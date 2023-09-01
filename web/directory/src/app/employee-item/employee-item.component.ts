import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeItemComponent {
  @Input() employee?: Employee;
}
