import { Component } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { ExpenseModalComponent } from '../components/expense-modal/expense-modal.component';
import { ExpenseService } from '../services/expense.service';
import { dismissPlugin } from '@data/superAppHandoff';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage {
  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    public expenseService: ExpenseService
  ) {}

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

  dismiss() {
    dismissPlugin.dismiss();
  }
}
