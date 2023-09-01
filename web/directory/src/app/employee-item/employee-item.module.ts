import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeItemComponent } from './employee-item.component';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [EmployeeItemComponent],
  exports: [EmployeeItemComponent],
})
export class EmployeeItemComponentModule {}
