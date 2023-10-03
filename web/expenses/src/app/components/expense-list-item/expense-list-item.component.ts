import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';
import { IonRouterOutlet, IonicModule, ModalController } from '@ionic/angular';
import { Expense } from '@data/types';
import { ExpenseService } from 'src/app/services/expense.service';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';

@Component({
  selector: 'app-expense-list-item',
  templateUrl: './expense-list-item.component.html',
  styleUrls: ['./expense-list-item.component.scss'],
})
export class ExpenseListItemComponent implements OnInit {
  @Input() expense!: Expense;
  @Output() expenseClicked = new EventEmitter<number>();

  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {}

  async openModal(expenseId?: number) {
    const modal = await this.modalCtrl.create({
      component: ExpenseModalComponent,
      canDismiss: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        existingExpenseId: expenseId,
      },
    });
    modal.present();
  }

  async removeExpense() {
    await this.expenseService.removeExpense(this.expense);
  }
}

@NgModule({
  declarations: [ExpenseListItemComponent],
  exports: [ExpenseListItemComponent],
  imports: [CommonModule, IonicModule],
})
export class ExpenseListItemModule {}
