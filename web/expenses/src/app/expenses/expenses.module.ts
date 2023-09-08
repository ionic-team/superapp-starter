import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesPageRoutingModule } from './expenses-routing.module';

import { ExpensesPage } from './expenses.page';
import { ExpenseListItemModule } from '../components/expense-list-item/expense-list-item.component';
import { ExpenseModalModule } from '../components/expense-modal/expense-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesPageRoutingModule,
    ExpenseListItemModule,
    ExpenseModalModule,
  ],
  declarations: [ExpensesPage],
})
export class ExpensesPageModule {}
